import {
  PANE_DEFAULTS,
} from './constants.js';

import {
  range,
  makeHTMLTag,
} from './util.js';

// Describes the state of one pane.
var PaneModel = function(attributes) {
  if (typeof attributes === 'undefined') {
    attributes = PANE_DEFAULTS;
  }

  for (var key in PANE_DEFAULTS) {
    // If the key does not exist in attributes, use the default value.
    this[key] = attributes[key] || PANE_DEFAULTS[key];
  }
};

// Describes the state of a grid (2D array) of panes.
var PaneGridModel = function(rows, cols, grid) {
  this.rows = rows;
  this.cols = cols;
  this.grid = grid.map(function(row) {
    return row.map(function(attributes) {
      return new PaneModel(attributes);
    });
  });
};

// Returns the PaneModel object in the given position in the grid.
PaneGridModel.prototype.findPane = function(row, col) {
  return this.grid[row][col];
};

// Sets a property of the given PaneModel object to the given value.
PaneGridModel.prototype.setProperty = function(row, col, property, value) {
  var thisPane = this.grid[row][col];
  thisPane[property] = value;
  return thisPane;
};

// Sets the 'active' property of the given PaneModel object. Then, updates
// the output panes.
PaneGridModel.prototype.setActive = function(row, col, active) {
  this.setProperty(row, col, 'active', active);
  this.updateOutputs();
};

// Sets the 'type' property of the given PaneModel object and removes its
// content. Then, updates the output panes.
PaneGridModel.prototype.setType = function(row, col, type) {
  var pane = this.setProperty(row, col, 'type', type);
  pane.content = '';
  this.updateOutputs();
};

// Sets the 'codeLocation' property of the given PaneModel object. Then, updates
// the output panes.
PaneGridModel.prototype.setCodeLocation = function(row, col, codeLocation) {
  this.setProperty(row, col, 'codeLocation', codeLocation);
  this.updateOutputs();
};

// Sets the 'content' property of the given PaneModel object. If the pane
// changed is not an output pane, updates the output panes.
PaneGridModel.prototype.setContent = function(row, col, content) {
  var pane = this.setProperty(row, col, 'content', content);

  if (pane.type !== 'output') {
    this.updateOutputs();
  }
};

// Sets all output panes to have the up-to-date output content.
PaneGridModel.prototype.updateOutputs = function() {
  var outputContent = this.getOutputContent();

  this.grid.forEach(function(row) {
    row.forEach(function(pane) {
      if (pane.type === 'output') {
        pane.content = outputContent;
      }
    });
  });
};

// Returns an HTML string of output content based on the contents of each pane.
PaneGridModel.prototype.getOutputContent = function() {
  var headContent = '';
  var bodyContent = '';

  this.grid.forEach(function(row) {
    row.forEach(function(pane) {
      if (pane.active) {
        switch (pane.type) {
          case 'html':
            switch (pane.codeLocation) {
              case 'body':
                bodyContent += pane.content;
                break;
            }
            break;
          case 'css':
            switch (pane.codeLocation) {
              case 'head':
                headContent += makeHTMLTag('style', pane.content);
                break;
            }
            break;
          case 'js':
            switch (pane.codeLocation) {
              case 'head':
                headContent += makeHTMLTag('script', pane.content);
                break;
              case 'window.onload':
                headContent += makeHTMLTag('script',
                  'window.onload = ' + pane.content);
                break;
            }
            break;
        }
      }
    });
  });

  return makeHTMLTag('head', headContent) + makeHTMLTag('body', bodyContent);
};

// Adds a row to the grid at a given index, then updates the output panes.
PaneGridModel.prototype.addRow = function(rowIndex) {
  var newRow = range(this.cols).map(function(i) {
    return new PaneModel();
  });

  this.grid.splice(rowIndex, 0, newRow);

  this.rows += 1;

  this.updateOutputs();
};

// Adds a column to the grid at a given index, then updates the output panes.
PaneGridModel.prototype.addCol = function(colIndex) {
  this.grid.forEach(function(row) {
    row.splice(colIndex, 0, new PaneModel());
  });

  this.cols += 1;

  this.updateOutputs();
};

// Removes a row from the grid at a given index, then updates the output panes.
PaneGridModel.prototype.removeRow = function(rowIndex) {
  this.grid.splice(rowIndex, 1);

  this.rows -= 1;

  this.updateOutputs();
};

// Removes a column from the grid at a given index, then updates the output
// panes.
PaneGridModel.prototype.removeCol = function(colIndex) {
  this.grid.forEach(function(row) {
    row.splice(colIndex, 1);
  });

  this.cols -= 1;

  this.updateOutputs();
};

export default PaneGridModel;
