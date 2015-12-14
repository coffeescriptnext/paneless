import React from 'react';
import PureComponent from 'react-pure-render/component';

// This class is a wrapper for a <button> tag. The button can be visible or
// hidden, and the button's text can be small or large. The button itself can
// also be assigned a class, an onclick function, and text or HTML content.
export default class ButtonWrapper extends PureComponent {
  render() {
    const {
      showButton,
      position,
      largeButton,
      onClick,
      content,
    } = this.props;

    const className = (showButton ? position : 'hidden')
      + (largeButton ? ' large' : '');

    return (
      <div className='flex'>
        <button
          className={className}
          onClick={onClick}
        >
          {content}
        </button>
      </div>
    );
  }
}
