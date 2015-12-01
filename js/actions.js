export const SET_PANE_PROPERTY = 'SET_PANE_PROPERTY';

export const ADD_ROW = 'ADD_ROW';
export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_ROW = 'REMOVE_ROW';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';

export const SET_AUTO_REFRESH = 'SET_AUTO_REFRESH';

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const setPaneProperty = makeActionCreator(
  SET_PANE_PROPERTY,
  'id',
  'name',
  'value',
);

export const addRow = makeActionCreator(ADD_ROW, 'index');
export const addColumn = makeActionCreator(ADD_COLUMN, 'index');
export const removeRow = makeActionCreator(REMOVE_ROW, 'index');
export const removeColumn = makeActionCreator(REMOVE_COLUMN, 'index');

export const setAutoRefresh = makeActionCreator(SET_AUTO_REFRESH, 'value');
