var containerTypeFullNames = {'js': 'Javascript',
                              'html': 'HTML',
                              'css': 'CSS',}

var TextContainer = React.createClass({
  render: function() {
    var containerType = this.props.containerType;

    if (containerType === 'output') {
      insideElement = <iframe className='left-inner-output'/>;
    } else {
      insideElement = <textarea className='left-inner'
                                placeholder={containerTypeFullNames[containerType]}></textarea>;
    }

    return <div className='left'>{insideElement}</div>;
  }
});

React.render(<div id='container'><TextContainer containerType='html' /></div>,
  document.body);
