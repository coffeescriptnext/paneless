var PANE_DEFAULTS = {
  active: false,
  type: 'js',
  codeLocation: 'head',
  content: '',
};

var CODE_LOCATION_DEFAULTS = {
  js: 'head',
  html: 'body',
  css: 'head',
  output: '',
};

var GRID_ATTRIBUTE_DEFAULTS = [{
  row: 0,
  col: 0,
  active: true,
  type: 'html',
  codeLocation: 'body',
  content: '',
}, {
  row: 0,
  col: 1,
  active: true,
  type: 'js',
  codeLocation: 'window.onload',
  content: '',
}, {
  row: 1,
  col: 0,
  active: true,
  type: 'css',
  codeLocation: 'head',
  content: '',
}, {
  row: 1,
  col: 1,
  active: true,
  type: 'output',
  codeLocation: '',
  content: '',
}];

var PANE_TYPE_FULL_NAMES = {
  'js': 'Javascript',
  'html': 'HTML',
  'css': 'CSS',
  'output': 'Output',
}

var PANE_CODE_LOCATIONS = {
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
