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

var PaneHeader = React.createClass({
  render: function() {
    return (
      <div className='pane-header'>
        <select>
          {Object.keys(paneTypeFullNames).map(function(k) {
            return (
              <option value={k} selected={k === this.props.paneType}>
                {paneTypeFullNames[k]}
              </option>
            );
          }, this)}
        </select>
      </div>
    );
  }
});

var PaneContainer = React.createClass({
  getInitialState: function() {
    return {paneType: this.props.initPaneType};
  },

  render: function() {
    return (
      <div className='pane-container'>
        <PaneHeader paneType={this.state.paneType} />
        <Pane paneType={this.state.paneType} />
      </div>
    );
  }
});

React.render(<PaneContainer initPaneType='html' />,
  document.body);
