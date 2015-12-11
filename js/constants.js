import { range } from './util';

// Time in milliseconds to wait after the user stops typing to update the UI.
export const TYPING_TIMEOUT = 250;

// Values for the default pane type. Used when adding new rows / columns.
export const PANE_DEFAULTS = id => ({
  id,
  active: false,
  type: 'js',
  codeLocation: 'head',
  content: '',
});

// Default code locations for the different code types. Used when the type of
// a pane is changed and a valid code location needs to be provided.
export const CODE_LOCATION_DEFAULTS = {
  js: 'head',
  html: 'body',
  css: 'head',
  output: '',
};

// The default grid that is shown upon loading a page.
export function GRID_ATTRIBUTE_DEFAULTS(makeID) {
  let ids = range(4).map(makeID);

  return {
    rows: 2,
    columns: 2,
    paneOrder: ids,
    panes: [{
      id: ids[0],
      active: true,
      type: 'html',
      codeLocation: 'body',
      content: '',
    }, {
      id: ids[1],
      active: true,
      type: 'js',
      codeLocation: 'window.onload',
      content: '',
    }, {
      id: ids[2],
      active: true,
      type: 'css',
      codeLocation: 'head',
      content: '',
    }, {
      id: ids[3],
      active: true,
      type: 'output',
      codeLocation: '',
      content: '',
    }],
  };
}

// The full names of the different pane types. Used in the <select> tag for the
// pane type, and as the placeholder text in the <textarea> tag.
export const PANE_TYPE_FULL_NAMES = {
  'js': 'Javascript',
  'html': 'HTML',
  'css': 'CSS',
  'output': 'Output',
}

// Descriptions of the code locations. Used in the <select> tag for the code
// location.
export const PANE_CODE_LOCATIONS = {
  'js': {
    'head': 'Inside a <script> tag in <head>',
    'window.onload': 'Inside window.onload',
  },
  'html': {
    'body': 'Inside <body>',
  },
  'css': {
    'head': 'Inside a <style> tag in <head>'
  },
  'output': {
  },
}
