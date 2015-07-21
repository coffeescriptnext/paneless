var paneTypeFullNames = {
  'js': 'Javascript',
  'html': 'HTML',
  'css': 'CSS',
  'output': 'Output',
}

var paneCodeLocations = {
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

var Pane = React.createClass({
  render: function() {
    var type = this.props.type;

    if (type === 'output') {
      return <iframe className='inner content' />;
    } else {
      return (
        <textarea
          className='inner content'
          placeholder={paneTypeFullNames[type]}
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
        {Object.keys(paneTypeFullNames).map(function(k) {
          return (
            <option value={k}>
              {paneTypeFullNames[k]}
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
    var thisCodeLocations = paneCodeLocations[this.props.type];

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
    var pane = this.props.pane;
    this.props.setActive(pane.row, pane.col, active);
  },

  setType: function(type) {
    var pane = this.props.pane;
    this.props.setType(pane.row, pane.col, type);
  },

  setCodeLocation: function(codeLocation) {
    var pane = this.props.pane;
    this.props.setCodeLocation(pane.row, pane.col, codeLocation);
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
          />
        </div>
      );
    } else {
      return (
        <div className='pane inactive'>
          <img
            className='plus-sign'
            src='../assets/plus-sign-300-transparent.png'
            onClick={this.setActive.bind(this, true)}
          />
        </div>
      );
    }
  }
});

var gridAttributes = [{
  row: 0,
  col: 0,
  active: true,
  type: 'html',
  codeLocation: 'body',
}, {
  row: 0,
  col: 1,
  active: true,
  type: 'js',
  codeLocation: 'window.onload',
}, {
  row: 1,
  col: 0,
  active: true,
  type: 'css',
  codeLocation: 'head',
}, {
  row: 1,
  col: 1,
  active: true,
  type: 'output',
  codeLocation: '',
}];

var model = new PaneGridModel(2, 2, gridAttributes);

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

  render: function() {
    var model = this.state.model;

    return (
      <div className='temp'>
        {range(model.rows).map(function(row) {
          return (
            <div className='temp-row'>
              {range(model.cols).map(function(col) {
                return <PaneContainer
                  pane={model.findPane(row, col)}
                  setActive={this.setActive}
                  setType={this.setType}
                  setCodeLocation={this.setCodeLocation}
                />;
              }, this)}
            </div>
          );
        }, this)}
      </div>
    );
  }
});

React.render(<PaneGrid />, document.body);
