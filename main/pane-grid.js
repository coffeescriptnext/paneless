var PaneGridModel = function(rows, cols, grid) {
  this.rows = rows;
  this.cols = cols;
  this.grid = grid.map(function(row) { row
    return row.map(function(attributes) {
      return new PaneModel(attributes);
    });
  });
};

PaneGridModel.prototype.findPane = function(row, col) {
  return this.grid[row][col];
};

PaneGridModel.prototype.setProperty = function(row, col, property, value) {
  var thisPane = this.grid[row][col];
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

  this.grid.forEach(function(row) {
    row.forEach(function(pane) {
      if (pane.type === 'output') {
        pane.content = outputContent;
      }
    });
  });
};

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

PaneGridModel.prototype.addRow = function(rowIndex) {
  var newRow = range(this.cols).map(function(i) {
    return new PaneModel();
  });

  this.grid.splice(rowIndex, 0, newRow);

  this.rows += 1;

  this.updateOutputs();
};

PaneGridModel.prototype.addCol = function(colIndex) {
  this.grid.forEach(function(row) {
    row.splice(colIndex, 0, new PaneModel());
  });

  this.cols += 1;

  this.updateOutputs();
};

PaneGridModel.prototype.removeRow = function(rowIndex) {
  this.grid.splice(rowIndex, 1);

  this.rows -= 1;

  this.updateOutputs();
};

PaneGridModel.prototype.removeCol = function(colIndex) {
  this.grid.forEach(function(row) {
    row.splice(colIndex, 1);
  });

  this.cols -= 1;

  this.updateOutputs();
};
