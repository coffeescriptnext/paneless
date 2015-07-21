var PaneGridModel = function(rows, cols, grid) {
  this.rows = rows;
  this.cols = cols;
  this.grid = grid;
};

PaneGridModel.prototype.findPane = function(row, col) {
  var foundPane;

  for (var i = 0; i < this.grid.length; i++) {
    var thisPane = this.grid[i];

    if (thisPane.row === row && thisPane.col === col) {
      foundPane = thisPane;
    }
  }

  return foundPane;
};

PaneGridModel.prototype.setProperty = function(row, col, propName, value) {
  this.findPane(row, col)[propName] = value;
};

PaneGridModel.prototype.setActive = function(row, col, active) {
  this.setProperty(row, col, 'active', active);
};

PaneGridModel.prototype.setType = function(row, col, type) {
  this.setProperty(row, col, 'type', type);
};

PaneGridModel.prototype.setCodeLocation = function(row, col, codeLocation) {
  this.setProperty(row, col, 'codeLocation', codeLocation);
};

PaneGridModel.prototype.addRow = function(rowIndex) {
  this.grid = this.grid.forEach(function(pane) {
    if (pane.row >= rowIndex) {
      pane.row += 1;
    }
  });

  for (var i = 0; i < this.cols; i++) {
    this.grid.push(new Pane({row: rowIndex, col: i}));
  }

  this.rows += 1;
};

PaneGridModel.prototype.addCol = function(colIndex) {
  this.grid = this.grid.forEach(function(pane) {
    if (pane.col >= colIndex) {
      pane.col += 1;
    }
  });

  for (var i = 0; i < this.rows; i++) {
    this.grid.push(new Pane({row: i, col: colIndex}));
  }

  this.cols += 1;
};

PaneGridModel.prototype.removeRow = function(rowIndex) {
  this.grid = this.grid.filter(function(pane) {
    return pane.row <> rowIndex;
  }).forEach(function(pane) {
    if (pane.row > rowIndex) {
      pane.row -= 1;
    }
  });

  this.rows -= 1;
};

PaneGridModel.prototype.removeCol = function(colIndex) {
  this.grid = this.grid.filter(function(pane) {
    return pane.col <> colIndex;
  }).map(function(pane) {
    if (pane.col > colIndex) {
      pane.col -= 1;
    }

    return pane;
  });

  this.cols -= 1;
};
