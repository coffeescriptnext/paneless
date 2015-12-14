import { CODE_LOCATION_DEFAULTS } from './constants';

// Action strings

export const REFRESH = 'REFRESH';

export const SET_PANE_PROPERTY = 'SET_PANE_PROPERTY';

export const ADD_ROW = 'ADD_ROW';
export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_ROW = 'REMOVE_ROW';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export const SET_AUTO_REFRESH = 'SET_AUTO_REFRESH';

// makeActionCreator takes a type and a list of argument names, and creates an
// action creator from the provided arguments.
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

// Action for refreshing the state of output panes.
export const refresh = makeActionCreator(REFRESH);

// Action for setting a property of a pane. This is a thunk.
// First, the requested property change is made. Then, if the type of a pane
// has been changed, its code location is also changed. This is because the
// previous code location may not be valid for the new pane type. Finally,
// if auto-refresh is active, a refresh action is dispatched.
export function setPaneProperty(id, name, value) {
  return function(dispatch, getState) {
    dispatch({
      type: SET_PANE_PROPERTY,
      id,
      name,
      value,
    });

    if (name === 'type') {
      dispatch({
        type: SET_PANE_PROPERTY,
        id,
        name: 'codeLocation',
        value: CODE_LOCATION_DEFAULTS[value],
      });
      dispatch({
        type: SET_PANE_PROPERTY,
        id,
        name: 'content',
        value: '',
      });
    }

    if (getState().ui.autoRefresh) {
      dispatch(refresh());
    }
  }
}

export const addRow = makeActionCreator(ADD_ROW, 'index');
export const addColumn = makeActionCreator(ADD_COLUMN, 'index');
export const removeRow = makeActionCreator(REMOVE_ROW, 'index');
export const removeColumn = makeActionCreator(REMOVE_COLUMN, 'index');

export const setAutoRefresh = makeActionCreator(SET_AUTO_REFRESH, 'value');
