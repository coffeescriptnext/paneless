var PaneModel = function(attributes) {
  this.row = attributes.row;
  this.col = attributes.col;

  for (var key in PANE_DEFAULTS) {
    this[key] = attributes[key] || PANE_DEFAULTS[key];
  }
};
