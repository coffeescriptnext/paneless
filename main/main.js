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
          className='inner content textarea'
          placeholder={paneTypeFullNames[type]} />
      );
    }
  }
});

var PaneTypeSelector = React.createClass({
  render: function() {
    return (
      <select value={this.props.type} onChange={this.props.onTypeChange}>
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
  render: function() {
    var thisCodeLocations = paneCodeLocations[this.props.type];

    if (Object.keys(thisCodeLocations).length === 0) {
      return false;
    } else {
      return (
        <select value={this.props.codeLocation} onChange={this.props.onCodeLocationChange}>
          {Object.keys(thisCodeLocations).map(function(k) {
            return (
              <option value={k}>
                {thisCodeLocations[k]}
              </option>
            );
          }, this)}
        </select>
      );
    }
  }
});

var PaneHeader = React.createClass({
  render: function() {
    return (
      <div className='inner header'>
        <PaneTypeSelector
          type={this.props.type}
          onTypeChange={this.props.onTypeChange} />
        <PaneCodeLocationSelector
          type={this.props.type}
          codeLocation={this.props.codeLocation}
          onCodeLocationChange={this.props.onCodeLocationChange} />
      </div>
    );
  }
});

var PaneContainer = React.createClass({
  getInitialState: function() {
    return {
      type: this.props.initType,
      codeLocation: this.props.initCodeLocation,
    };
  },

  onTypeChange: function(event) {
    this.setState({type: event.target.value});
  },

  onCodeLocationChange: function(event) {
    this.setState({codeLocation: event.target.value});
  },

  render: function() {
    return (
      <div className='pane'>
        <PaneHeader
          type={this.state.type}
          onTypeChange={this.onTypeChange}
          codeLocation={this.state.codeLocation}
          onCodeLocationChange={this.onCodeLocationChange} />
        <Pane type={this.state.type} />
      </div>
    );
  }
});

React.render(<div className='temp'>
  <PaneContainer initType='html' codeLocation='' />
  <PaneContainer initType='html' codeLocation='' />
  <PaneContainer initType='html' codeLocation='' />
  <PaneContainer initType='html' codeLocation='' />
  </div>,
  document.body);
