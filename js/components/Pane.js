import React from 'react';

import { PANE_TYPE_FULL_NAMES } from '../constants';

// This class represents the <textarea> or <iframe> tag inside a pane.
export default class Pane extends React.Component {
  setContent(event) {
    this.props.setContent(event.target.value);
  }

  render() {
    var type = this.props.type;
    var content = this.props.content;

    if (type === 'output') {
      return (
        <iframe
          className='content'
          srcDoc={content}
        />
      );
    } else {
      return (
        <textarea
          className='content'
          placeholder={PANE_TYPE_FULL_NAMES[type]}
          defaultValue={content}
          onChange={this.setContent}
        />
      );
    }
  }
}
