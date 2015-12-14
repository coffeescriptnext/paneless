import { combineReducers } from 'redux';

import {
  PANE_DEFAULTS,
  GRID_ATTRIBUTE_DEFAULTS,
} from './constants.js';

import {
  REFRESH,
  SET_PANE_PROPERTY,
  ADD_ROW,
  ADD_COLUMN,
  REMOVE_ROW,
  REMOVE_COLUMN,
  SET_AUTO_REFRESH,
} from './actions';

import getID from './id-generator';

import {
  range,
  makeHTMLTag,
} from './util';

// Reducer for an individual pane.
function pane(id) {
  return function(state = PANE_DEFAULTS(id), action) {
    switch (action.type) {
      case SET_PANE_PROPERTY:
        if (action.id === state.id) {
          // Update the pane's property.
          return Object.assign({}, state, {
            [action.name]: action.value,
          });
        }
      default:
        return state;
    }
  };
}

// Given an array of panes, returns <head> and <body> content for the output
// panes.
function getOutput(panes) {
  let HEAD = 0, BODY = 1;

  function pairAppend(pair, index, toAdd) {
    if (index === 0) {
      return [pair[0] + toAdd, pair[1]];
    } else if (index === 1) {
      return [pair[0], pair[1] + toAdd];
    } else {
      return pair;
    }
  }

  return panes.reduce(function(acc, pane) {
    if (pane.active) {
      switch (pane.type) {
        case 'html':
          switch (pane.codeLocation) {
            case 'body':
              return pairAppend(acc, BODY, pane.content);
          }
        case 'css':
          switch (pane.codeLocation) {
            case 'head':
              return pairAppend(acc, HEAD, makeHTMLTag('style', pane.content));
          }
        case 'js':
          switch (pane.codeLocation) {
            case 'head':
              return pairAppend(acc, HEAD, makeHTMLTag('script', pane.content));
            case 'window.onload':
              return pairAppend(acc, HEAD, makeHTMLTag(
                'script',
                'window.onload = ' + pane.content
              ));
          }
      }
    }

    return acc;
  }, ['', '']).join('');
}

// Reducer for the entire grid of panes.
function paneGrid(state = GRID_ATTRIBUTE_DEFAULTS(getID), action) {
  const {
    rows,
    columns,
    panes,
    paneOrder
  } = state;

  let ids, newPanes;

  switch (action.type) {
    // Calculate the new output pane content, and update each output pane.
    case REFRESH:
      const output = getOutput(panes);

      return Object.assign({}, state, {
        panes: panes.map(function(p) {
          if (p.type === 'output') {
            p.content = output;
          }
          return p;
        }),
      });
    // Pass the action on to each pane in turn. Since we check for a match
    // between the pane ID and the action ID, only the correct pane will be
    // updated.
    case SET_PANE_PROPERTY:
      return Object.assign({}, state, {
        panes: state.panes.map(p => pane(p.id)(p, action)),
      });
    // Add one to the row count. Create {# columns} new panes with unique
    // IDs. Then, insert these IDs into the ordered list of IDs, and add the
    // new panes to the list of panes.
    case ADD_ROW:
      const insertAt = columns * action.index;
      ids = range(columns).map(getID);
      newPanes = ids.map(id => pane(id)(undefined, action));

      return Object.assign({}, state, {
        rows: rows + 1,
        paneOrder: [].concat(
          paneOrder.slice(0, insertAt),
          ids,
          paneOrder.slice(insertAt)
        ),
        panes: [].concat(panes, newPanes),
      });
    // Subtract one from the row count. Calculate the IDs to remove (there
    // will be {# columns} of them). Then, remove the IDs from the ordered list
    // of pane IDs, and filter them out of the list of panes.
    case REMOVE_ROW:
      const removeStart = columns * action.index;
      const removeEnd = removeStart + columns;
      ids = paneOrder.slice(removeStart, removeEnd);

      return Object.assign({}, state, {
        rows: rows - 1,
        paneOrder: [].concat(
          paneOrder.slice(0, removeStart),
          paneOrder.slice(removeEnd)
        ),
        panes: panes.filter(p => ids.indexOf(p.id) === -1),
      });
      // Add one to the column count. Generate {# rows} new panes with unique
      // IDs. Add the new panes on to the list of panes.
      // Adding the new IDs is more difficult. First, cut up the array of
      // IDs into arrays of rows of IDs. Then, for each row, add the
      // corresponding new ID into the correct place in the row. Finally,
      // concatenate the rows back together into one array.
      case ADD_COLUMN:
        ids = range(rows).map(getID);
        let newPanes = ids.map(id => pane(id)(undefined, action));

        return Object.assign({}, state, {
          columns: columns + 1,
          paneOrder: range(rows).reduce(
            (acc, i) => acc.concat(
              [paneOrder.slice(i * columns, (i + 1) * columns)]
            ),
            []
          ).map((arr, i) => [].concat(
              arr.slice(0, action.index),
              [ids[i]],
              arr.slice(action.index)
          )).reduce(
            (acc, p) => acc.concat(p),
            []
          ),
          panes: [].concat(panes, newPanes),
        });
      // First, remove the IDs that should be removed by checking which column
      // they are in. Then, subtract one from the column count, and filter out
      // the panes that have been removed.
      case REMOVE_COLUMN:
        const newPaneOrder = paneOrder.filter(
          (_, i) => i % columns !== action.index
        );

        return Object.assign({}, state, {
          columns: columns - 1,
          paneOrder: newPaneOrder,
          panes: panes.filter(
            p => newPaneOrder.indexOf(p.id) !== -1
          ),
        });
    default:
      return state;
  }
}

function ui(state = { autoRefresh: true }, action) {
  switch (action.type) {
    case SET_AUTO_REFRESH:
      return {
        autoRefresh: action.value
      };
    default:
      return state;
  }
}

export default combineReducers({
  paneGrid,
  ui,
});
