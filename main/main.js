var containerTypeFullNames = {'js': 'Javascript',
                              'html': 'HTML',
                              'css': 'CSS',}

var TextContainer = React.createClass({
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
    return <div className='pane'><TextContainer containerType={this.props.containerType} /></div>;
  }
});

React.render(<div id='container'><PaneContainer containerType='html' /></div>,
  document.body);
