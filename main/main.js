var paneTypeFullNames = {
  'js': 'Javascript',
  'html': 'HTML',
  'css': 'CSS',
  'output': 'Output',
}

var Pane = React.createClass({
  render: function() {
    var type = this.props.type;

    if (type === 'output') {
      return (
        <iframe className='pane'/>
      );
    } else {
      return (
        <textarea
          className='pane textarea'
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

var PaneHeader = React.createClass({
  render: function() {
    return (
      <div className='pane-header'>
        <PaneTypeSelector
          type={this.props.type}
          onTypeChange={this.props.onTypeChange} />
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
      <div className='pane-container'>
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

React.render(<PaneContainer initType='html' codeLocation='' />,
  document.body);
