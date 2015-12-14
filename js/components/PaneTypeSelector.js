import React from 'react';
import PureComponent from 'react-pure-render/component';

import {
  CODE_LOCATION_DEFAULTS,
  PANE_TYPE_FULL_NAMES,
} from '../constants';

// This class represents the <select> tag that lets the user choose the type of
// a pane (HTML, CSS, Javascript, or output).
export default class PaneTypeSelector extends PureComponent {
  render() {
    const {
      type,
      setType,
    } = this.props;

    return (
      <select
        value={type}
        onChange={e => setType(e.target.value)}
      >
        {Object.keys(PANE_TYPE_FULL_NAMES).map(function(k) {
          return (
            <option value={k}>
              {PANE_TYPE_FULL_NAMES[k]}
            </option>
          );
        })}
      </select>
    );
  }
}
