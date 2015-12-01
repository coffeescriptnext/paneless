import { combineReducers } from 'redux';

import {
  PANE_DEFAULTS,
  PANE_GRID_DEFAULTS,
} from './constants.js';

import {
  SET_PANE_PROPERTY,
  ADD_ROW,
  ADD_COLUMN,
  REMOVE_ROW,
  REMOVE_COLUMN,
};

import getID from './id-generator';

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

function paneGrid(state = PANE_GRID_DEFAULTS(getID), action) {
  const {
    rows,
    cols,
    panes,
    paneOrder
  } = state;

  switch (action.type) {
    case SET_PANE_PROPERTY:
      return Object.assign({}, state, {
        panes: panes.map(p => pane(p.id)(p, action)),
      });
    case ADD_ROW:
      const insertAt = cols * action.index;
      const ids = range(cols).map(getID);
      const newPanes = ids.map(id => pane(id)(undefined, action));

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
      const removeStart = cols * action.index;
      const removeEnd = removeStart + cols;
      const ids = paneOrder.slice(removeStart, removeEnd);

      return Object.assign({}, state, {
        rows: rows - 1,
        paneOrder: [].concat(
          paneOrder.slice(0, removeStart),
          paneOrder.slice(removeEnd)
        ),
        panes: panes.filter(p => ids.indexOf(p.id) === -1),
      });
      case ADD_COLUMN:
        const ids = range(rows).map(getID);
        const newPanes = ids.map(id => pane(id)(undefined, action));

        return Object.assign({}, state, {
          cols: cols + 1,
          paneOrder: range(rows).reduce(
            (acc, i) => acc.concat(paneOrder.slice(i * cols, (i + 1))),
            []
          ).map(
            (arr, i) => arr.concat(ids[i])
          ).reduce(
            (acc, p) => acc.concat(p),
            []
          ),
          panes: [].concat(panes, newPanes),
        });
      case REMOVE_COLUMN:
        return Object.assign({}, state, {
          rows: rows - 1,
          paneOrder: paneOrder.filter(
            i => i % rows === action.index
          );
          panes: panes.filter(
            p => p.index % rows === action.index
          );
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
