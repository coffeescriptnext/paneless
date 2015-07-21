var PaneGridModel = function(rows, cols, grid) {
  this.rows = rows;
  this.cols = cols;
  this.grid = grid.map(function(pane) {return new PaneModel(pane)});
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

PaneGridModel.prototype.setProperty = function(row, col, property, value) {
  var thisPane = this.findPane(row, col);
  thisPane[property] = value;
  return thisPane;
};

PaneGridModel.prototype.setActive = function(row, col, active) {
  this.setProperty(row, col, 'active', active);
  this.updateOutputs();
};

PaneGridModel.prototype.setType = function(row, col, type) {
  var pane = this.setProperty(row, col, 'type', type);
  pane.content = '';
  this.updateOutputs();
};

PaneGridModel.prototype.setCodeLocation = function(row, col, codeLocation) {
  this.setProperty(row, col, 'codeLocation', codeLocation);
  this.updateOutputs();
};

PaneGridModel.prototype.setContent = function(row, col, content) {
  var pane = this.setProperty(row, col, 'content', content);

  if (pane.type !== 'output') {
    this.updateOutputs();
  }
};

PaneGridModel.prototype.updateOutputs = function() {
  var outputContent = this.getOutputContent();

  this.grid.forEach(function(pane) {
    if (pane.type === 'output') {
      pane.content = outputContent;
    }
  });
};

PaneGridModel.prototype.getOutputContent = function() {
  var headContent = '';
  var bodyContent = '';

  this.grid.forEach(function(pane) {
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
              headContent += makeHTMLTag('script', pane.content);
              break;
          }
          break;
      }
    }
  });

  return makeHTMLTag('head', headContent) + makeHTMLTag('body', bodyContent);
};

PaneGridModel.prototype.addRow = function(rowIndex) {
  this.grid.forEach(function(pane) {
    if (pane.row >= rowIndex) {
      pane.row += 1;
    }
  });

  for (var i = 0; i < this.cols; i++) {
    this.grid.push(new PaneModel({row: rowIndex, col: i}));
  }

  this.rows += 1;
};

PaneGridModel.prototype.addCol = function(colIndex) {
  this.grid.forEach(function(pane) {
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
    return pane.row !== rowIndex;
  }).map(function(pane) {
    if (pane.row > rowIndex) {
      pane.row -= 1;
    }
    return pane;
  });

  this.rows -= 1;
};

PaneGridModel.prototype.removeCol = function(colIndex) {
  this.grid = this.grid.filter(function(pane) {
    return pane.col !== colIndex;
  }).map(function(pane) {
    if (pane.col > colIndex) {
      pane.col -= 1;
    }
    return pane;
  });

  this.cols -= 1;
};
