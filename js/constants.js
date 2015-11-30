// Time in milliseconds to wait after the user stops typing to update the UI.
export const TYPING_TIMEOUT = 250;

// Values for the default pane type. Used when adding new rows / columns.
export const PANE_DEFAULTS = {
  active: false,
  type: 'js',
  codeLocation: 'head',
  content: '',
};

// Default code locations for the different code types. Used when the type of
// a pane is changed and a valid code location needs to be provided.
export const CODE_LOCATION_DEFAULTS = {
  js: 'head',
  html: 'body',
  css: 'head',
  output: '',
};

// The default grid that is shown upon loading a page.
export const GRID_ATTRIBUTE_DEFAULTS = [[{
  active: true,
  type: 'html',
  codeLocation: 'body',
  content: '',
}, {
  active: true,
  type: 'js',
  codeLocation: 'window.onload',
  content: '',
}], [{
  active: true,
  type: 'css',
  codeLocation: 'head',
  content: '',
}, {
  active: true,
  type: 'output',
  codeLocation: '',
  content: '',
}]];

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
