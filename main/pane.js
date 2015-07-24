var PaneModel = function(attributes) {
  if (typeof attributes === 'undefined') {
    attributes = PANE_DEFAULTS;
  }

  for (var key in PANE_DEFAULTS) {
    this[key] = attributes[key] || PANE_DEFAULTS[key];
  }
};
