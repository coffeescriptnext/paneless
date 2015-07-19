var containerTypeFullNames = {'js': 'Javascript',
                              'html': 'HTML',
                              'css': 'CSS',}

var Pane = React.createClass({
  render: function() {
    var containerType = this.props.containerType;

    if (containerType === 'output') {
      return <iframe className='inner-output'/>;
    } else {
      return <textarea className='inner' placeholder={containerTypeFullNames[containerType]}></textarea>;
    }
  }
});

var PaneContainer = React.createClass({
  render: function() {
    return <div className='pane'><Pane containerType={this.props.containerType} /></div>;
  }
});

React.render(<PaneContainer containerType='html' />,
  document.body);
