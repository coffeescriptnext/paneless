var PANE_DEFAULTS = {
  active: false,
  type: 'js',
  codeLocation: 'head',
};

var CODE_LOCATION_DEFAULTS = {
  js: 'head',
  html: 'body',
  css: 'head',
  output: '',
};

var PaneModel = function(attributes) {
  this.row = attributes.row;
  this.col = attributes.col;

  for (var key in PANE_DEFAULTS) {
    this[key] = attributes[key] || PANE_DEFAULTS[key];
  }
};
