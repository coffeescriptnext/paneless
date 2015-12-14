import React from 'react';
import PureComponent from 'react-pure-render/component';

import { PANE_TYPE_FULL_NAMES } from '../constants';

// This class represents the <textarea> or <iframe> tag inside a pane.
export default class Pane extends PureComponent {
  render() {
    const {
      id,
      type,
      content,
      setContent,
    } = this.props;

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
          value={content}
          onChange={e => setContent(id, e.target.value)}
        />
      );
    }
  }
}
