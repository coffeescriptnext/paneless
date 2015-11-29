import React from 'react';

import { PANE_TYPE_FULL_NAMES } from '../constants';

// This class represents the <textarea> or <iframe> tag inside a pane.
export default React.createClass({
  setContent: function(event) {
    this.props.setContent(event.target.value);
  },

  render: function() {
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
});
