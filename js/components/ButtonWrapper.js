import React from 'react';

// This class is a wrapper for a <button> tag. The button can be visible or
// hidden, and the button's text can be small or large. The button itself can
// also be assigned a class, an onclick function, and text or HTML content.
export default class ButtonWrapper extends React.Component {
  render() {
    const className = (this.props.showButton ? this.props.position : 'hidden')
      + (this.props.largeButton ? ' large' : '');

    return (
      <div className='flex'>
        <button
          className={className}
          onClick={this.props.onClick}
        >
          {this.props.content}
        </button>
      </div>
    );
  }
}
