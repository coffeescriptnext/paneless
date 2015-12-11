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

function pane(id) {
  return function(state = PANE_DEFAULTS(id), action) {
    switch (action.type) {
      case SET_PANE_PROPERTY:
        if (action.id === state.id) {
          return Object.assign({}, state, {
            [action.name]: action.value,
          });
        }
      default:
        return state;
    }
  };
}

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
  }).join('');
}

function paneGrid(state = GRID_ATTRIBUTE_DEFAULTS(getID), action) {
  const {
    rows,
    columns,
    panes,
    paneOrder
  } = state;

  let ids, newPanes;

  switch (action.type) {
    case REFRESH:
      const output = getOutput(panes);

      return Object.assign({}, state, {
        panes: panes.map(function(p) {
          if (p.type === 'output') {
            p.content = output;
          } else {
            return p;
          }
        }),
      });
    case SET_PANE_PROPERTY:
      return Object.assign({}, state, {
        panes: panes.map(p => pane(p.id)(p, action)),
      });
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
