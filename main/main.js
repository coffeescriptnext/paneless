var containerTypeFullNames = {'js': 'Javascript',
                              'html': 'HTML',
                              'css': 'CSS',}

var Pane = React.createClass({
  render: function() {
    var containerType = this.props.containerType;

    if (containerType === 'output') {
      return (
        <iframe className='pane'/>
      );
    } else {
      return (
        <textarea className='pane textarea'
                  placeholder={containerTypeFullNames[containerType]} />
      );
    }
  }
});

var PaneHeader = React.createClass({
  render: function() {
    return (
      <div className='pane-header'>Hello PaneHeader!</div>
    );
  }
});

var PaneContainer = React.createClass({
  getInitialState: function() {
    return {containerType: this.props.initContainerType};
  },

  render: function() {
    return (
      <div className='pane-container'>
        <PaneHeader />
        <Pane containerType={this.state.containerType} />
      </div>
    );
  }
});

React.render(<PaneContainer initContainerType='html' />,
  document.body);
