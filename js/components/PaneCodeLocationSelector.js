import React from 'react';

import { PANE_CODE_LOCATIONS } from '../constants';

// This class represents the <select> tag that lets the user choose the code
// location of a pane.
export default class PaneCodeLocationSelector extends React.Component {
  render() {
    const {
      type,
      codeLocation,
      setCodeLocation,
    } = this.props;

    // typeCodeLocations contains the valid code locations for the pane's
    // current type.
    const typeCodeLocations = PANE_CODE_LOCATIONS[type];
    const typeCodeLocationsKeys = Object.keys(typeCodeLocations);

    // If the current pane type has no associated code locations (e.g. an output
    // pane), do not return an element.
    if (typeCodeLocationsKeys.length === 0) {
      return false;
    } else {
      return (
        <select
          value={codeLocation}
          onChange={e => setCodeLocation(e.target.value)}
        >
          {typeCodeLocationsKeys.map(function(k, i) {
            return (
              <option value={k} key={i}>
                {typeCodeLocations[k]}
              </option>
            );
          })}
        </select>
      );
    }
  }
}
