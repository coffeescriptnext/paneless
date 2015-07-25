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

var PaneTypeSelector = React.createClass({
  setType: function(event) {
    var type = event.target.value;
    this.props.setType(type);
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

var PaneCodeLocationSelector = React.createClass({
  setCodeLocation: function(event) {
    this.props.setCodeLocation(event.target.value);
  },

  render: function() {
    var thisCodeLocations = PANE_CODE_LOCATIONS[this.props.type];

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

var ColumnRemoverRow = React.createClass({
  removeCol: function(col) {
    this.props.removeCol(col);
  },

  render: function() {
    return (
      <div className={'pane-row adder'}>
        {this.props.rows > 1 ? (
          <RowColumnRemover
            type='row'
            button={false}
          />
        ) : false}
        {range(model.cols).map(function(col) {
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

var model = new PaneGridModel(2, 2, GRID_ATTRIBUTE_DEFAULTS);

var PaneGrid = React.createClass({
  getInitialState: function() {
    return {
      model: model,
    };
  },

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
              rows={model.rows}
              removeCol={this.removeCol}
            />
          ) : false}
          {range(model.rows).map(function(row) {
            return (
              <div className='pane-row'>
                {model.rows > 1 ? (
                  <RowColumnRemover
                    type='row'
                    button={true}
                    remove={this.removeRow.bind(this, row)}
                  />
                ) : false}
                {range(model.cols).map(function(col) {
                  return <PaneContainer
                    row={row}
                    col={col}
                    pane={model.findPane(row, col)}
                    setActive={this.setActive}
                    setType={this.setType}
                    setCodeLocation={this.setCodeLocation}
                    setContent={this.setContent}
                  />;
                }, this)}
              </div>
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

React.render(<PaneGrid />, document.body);
