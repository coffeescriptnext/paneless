import React from 'react';

import {
  CODE_LOCATION_DEFAULTS,
  PANE_TYPE_FULL_NAMES,
} from '../constants';

// This class represents the <select> tag that lets the user choose the type of
// a pane (HTML, CSS, Javascript, or output).
export default class PaneTypeSelector extends React.Component {
  setType(event) {
    var type = event.target.value;
    this.props.setType(type);

    // Update this pane's code location to the default for the new type.
    // Otherwise, the current code location could be invalid for the new type.
    // For example, if the user changes an HTML pane to a CSS pane, the 'body'
    // code location would not be listed in the pane's PaneTypeSelector. The
    // view and model would therefore be out of sync.
    this.props.setCodeLocation(CODE_LOCATION_DEFAULTS[type]);
  }

  render() {
    return (
      <select value={this.props.type} onChange={this.setType}>
        {Object.keys(PANE_TYPE_FULL_NAMES).map(function(k) {
          return (
            <option value={k}>
              {PANE_TYPE_FULL_NAMES[k]}
            </option>
          );
        }, this)}
      </select>
    );
  }
}
