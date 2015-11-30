import React from 'react';

import { PANE_CODE_LOCATIONS } from '../constants';

// This class represents the <select> tag that lets the user choose the code
// location of a pane.
export default class PaneCodeLocationSelector extends React.Component {
  setCodeLocation(event) {
    this.props.setCodeLocation(event.target.value);
  }

  render() {
    // typeCodeLocations contains the valid code locations for the pane's
    // current type.
    const typeCodeLocations = PANE_CODE_LOCATIONS[this.props.type];
    const typeCodeLocationsKeys = Object.keys(typeCodeLocations);

    // If the current pane type has no associated code locations (e.g. an output
    // pane), do not return an element.
    if (typeCodeLocationsKeys.length === 0) {
      return false;
    } else {
      return (
        <select value={this.props.codeLocation} onChange={this.setCodeLocation}>
          {typeCodeLocationsKeys.map(function(k) {
            return (
              <option value={k}>
                {typeCodeLocations[k]}
              </option>
            );
          })}
        </select>
      );
    }
  }
}
