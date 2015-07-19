var paneTypeFullNames = {
  'js': 'Javascript',
  'html': 'HTML',
  'css': 'CSS',
  'output': 'Output',
}

var Pane = React.createClass({
  render: function() {
    var paneType = this.props.paneType;

    if (paneType === 'output') {
      return (
        <iframe className='pane'/>
      );
    } else {
      return (
        <textarea className='pane textarea'
                  placeholder={paneTypeFullNames[paneType]} />
      );
    }
  }
});

var PaneTypeSelector = React.createClass({
  render: function() {
    return (
      <select value={this.props.paneType} onChange={this.props.onPaneTypeChange}>
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
          paneType={this.props.paneType}
          onPaneTypeChange={this.props.onPaneTypeChange} />
      </div>
    );
  }
});

var PaneContainer = React.createClass({
  getInitialState: function() {
    return {paneType: this.props.initPaneType};
  },

  onPaneTypeChange: function(event) {
    this.setState({paneType: event.target.value});
  },

  render: function() {
    return (
      <div className='pane-container'>
        <PaneHeader paneType={this.state.paneType} onPaneTypeChange={this.onPaneTypeChange}/>
        <Pane paneType={this.state.paneType} />
      </div>
    );
  }
});

React.render(<PaneContainer initPaneType='html' />,
  document.body);
