// Represents the <textarea> or <iframe> tag inside a pane.
var Pane = React.createClass({
  setContent: function(event) {
    this.props.setContent(event.target.value);
  },

  render: function() {
    var type = this.props.type;
    var content = this.props.content;

    if (type === 'output') {
      return (
        <iframe
          className='inner content'
          srcDoc={content}
        />
      );
    } else {
      return (
        <textarea
          className='inner content'
          placeholder={PANE_TYPE_FULL_NAMES[type]}
          defaultValue={content}
          onChange={this.setContent}
        />
      );
    }
  }
});

// Represents the <select> tag that lets the user choose the type of a pane.
var PaneTypeSelector = React.createClass({
  setType: function(event) {
    var type = event.target.value;
    this.props.setType(type);
    // Update code location to default for the new type. Otherwise, the current
    // code location could be invalid for the new type.
    this.props.setCodeLocation(CODE_LOCATION_DEFAULTS[type]);
  },

  render: function() {
    return (
      <select value={this.props.type} onChange={this.setType}>
        {Object.keys(PANE_TYPE_FULL_NAMES).map(function(k) {
          return (
            <option value={k}>
              {PANE_TYPE_FULL_NAMES[k]}
            </option>
          );
        }, this)}
      </select>
    );
  }
});

// Represents the <select> tag that lets the user choose the code location of
// a pane.
var PaneCodeLocationSelector = React.createClass({
  setCodeLocation: function(event) {
    this.props.setCodeLocation(event.target.value);
  },

  render: function() {
    var thisCodeLocations = PANE_CODE_LOCATIONS[this.props.type];

    // If the current pane type has no associated code locations (e.g. an output
    // pane), do not return an element.
    if (Object.keys(thisCodeLocations).length === 0) {
      return false;
    } else {
      return (
        <select value={this.props.codeLocation} onChange={this.setCodeLocation}>
          {Object.keys(thisCodeLocations).map(function(k) {
            return (
              <option value={k}>
                {thisCodeLocations[k]}
              </option>
            );
          })}
        </select>
      );
    }
  }
});

// Represents the header of a pane, which allows the user to change the pane's
// settings and deactivate it.
var PaneHeader = React.createClass({
  setInactive: function() {
    this.props.setActive(false);
  },

  render: function() {
    return (
      <div className='inner header'>
        <PaneTypeSelector
          type={this.props.type}
          setType={this.props.setType}
          setCodeLocation={this.props.setCodeLocation}
        />
        <PaneCodeLocationSelector
          type={this.props.type}
          codeLocation={this.props.codeLocation}
          setCodeLocation={this.props.setCodeLocation}
        />
        <button
          onClick={this.setInactive}>
            X
        </button>
      </div>
    );
  }
});

// Contains a pane's header and content. If the pane is inactive, allows the
// user to reactivate the pane.
var PaneContainer = React.createClass({
  setActive: function(active) {
    this.props.setActive(this.props.row, this.props.col, active);
  },

  setType: function(type) {
    this.props.setType(this.props.row, this.props.col, type);
  },

  setCodeLocation: function(codeLocation) {
    this.props.setCodeLocation(this.props.row, this.props.col, codeLocation);
  },

  setContent: function(content) {
    this.props.setContent(this.props.row, this.props.col, content);
  },

  render: function() {
    var pane = this.props.pane;

    if (pane.active) {
      return (
        <div className='pane'>
          <PaneHeader
            type={pane.type}
            codeLocation={pane.codeLocation}
            setActive={this.setActive}
            setType={this.setType}
            setCodeLocation={this.setCodeLocation}
          />
          <Pane
            type={pane.type}
            content={pane.content}
            setContent={this.setContent}
          />
        </div>
      );
    } else {
      return (
        <div className='pane inactive'>
          <button
            className='plus-minus'
            onClick={this.setActive.bind(this, true)}
          >
            +
          </button>
        </div>
      );
    }
  }
});

// Allows the user to remove the associated row or column.
var RowColumnRemover = React.createClass({
  render: function() {
    return (
      <div className={'pane adder ' + this.props.type}>
        {this.props.button ? (
          <button
            className='plus-minus'
            onClick={this.props.remove}
          >
            -
          </button>
        ) : false}
      </div>
    );
  }
});

// Represents the row at the top of the screen that contains the column removal
// buttons for each column.
var ColumnRemoverRow = React.createClass({
  removeCol: function(col) {
    this.props.removeCol(col);
  },

  render: function() {
    // This empty row removal <div> keeps the column remover buttons in line
    // with the columns. When there is only one row in the application, it is
    // not displayed, along with the row removal <div> tags for the other rows.
    var emptyRowRemover = (
      <RowColumnRemover
        type='row'
        button={false}
      />
    );

    return (
      <div className={'pane-row adder'}>
        {this.props.moreThanOneRow ? (
          emptyRowRemover
        ) : false}
        {range(this.props.cols).map(function(col) {
          return (
            <RowColumnRemover
              type='col'
              button={true}
              remove={this.removeCol.bind(this, col)}
            />
          );
        }, this)}
      </div>
    );
  }
});

// Represents one row of panes.
var PaneRow = React.createClass({
  render: function() {
    // If the application only has one row, this row removal button will not be
    // rendered.
    var rowRemover = (
      <RowColumnRemover
        type='row'
        button={true}
        remove={this.props.removeRow}
      />
    );

    return (
      <div className='pane-row'>
        {this.props.moreThanOneRow ? (
          rowRemover
        ) : false}
        {range(this.props.paneRow.length).map(function(col) {
          return (
            <PaneContainer
              row={this.props.row}
              col={col}
              pane={this.props.paneRow[col]}
              setActive={this.props.setActive}
              setType={this.props.setType}
              setCodeLocation={this.props.setCodeLocation}
              setContent={this.props.setContent}
            />
          );
        }, this)}
      </div>
    );
  }
});

// The model that the application is based on.
var model = new PaneGridModel(2, 2, GRID_ATTRIBUTE_DEFAULTS);

// The top-level class for the application's view.
var PaneGrid = React.createClass({
  getInitialState: function() {
    return {
      model: model,
    };
  },

  // This function should be called after the model has been updated.
  updateState: function() {
    this.setState({
      model: model,
    });
  },

  setActive: function(row, col, active) {
    model.setActive(row, col, active);
    this.updateState();
  },

  setType: function(row, col, type) {
    model.setType(row, col, type);
    this.updateState();
  },

  setCodeLocation: function(row, col, codeLocation) {
    model.setCodeLocation(row, col, codeLocation);
    this.updateState();
  },

  // When the user types in one of the <textarea> tags, the application will
  // wait for TYPING_TIMEOUT seconds before notifying React that the model has
  // been updated. If the user changes the model in the meantime, the timeout
  // will be reset.
  setContent: function(row, col, content) {
    model.setContent(row, col, content);

    var timer = this.inputTimer;

    if (typeof timer !== 'undefined') {
      clearTimeout(timer);
    }
    this.inputTimer = setTimeout(this.updateState, TYPING_TIMEOUT);
  },

  addRow: function() {
    var rowIndex = parseInt(document.getElementById('rowtoadd').value) - 1;
    model.addRow(rowIndex);
    this.updateState();
  },

  removeRow: function(rowIndex) {
    model.removeRow(rowIndex);
    this.updateState();
  },

  addCol: function() {
    var colIndex = parseInt(document.getElementById('coltoadd').value) - 1;
    model.addCol(colIndex);
    this.updateState();
  },

  removeCol: function(colIndex) {
    model.removeCol(colIndex);
    this.updateState();
  },

  render: function() {
    var model = this.state.model;

    return (
      <div className='wrapper'>
        <div className='pane-container'>
          {model.cols > 1 ? (
            <ColumnRemoverRow
              cols={model.cols}
              moreThanOneRow={model.rows > 1}
              cols={model.cols}
              removeCol={this.removeCol}
            />
          ) : false}
          {range(model.rows).map(function(row) {
            return (
              <PaneRow
                row={row}
                paneRow={model.grid[row]}
                moreThanOneRow={model.rows > 1}
                removeRow={this.removeRow.bind(this, row)}
                setActive={this.setActive}
                setType={this.setType}
                setCodeLocation={this.setCodeLocation}
                setContent={this.setContent}
              />
            );
          }, this)}
        </div>
        <div>
          Add row before row:
          <input type="text" id="rowtoadd"></input>
          <button onClick={this.addRow}>Add</button>
          <br />
          Add column before column:
          <input type="text" id="coltoadd"></input>
          <button onClick={this.addCol}>Add</button>
        </div>
      </div>
    );
  }
});

// Render the top-level class of the application.
React.render(<PaneGrid />, document.body);
