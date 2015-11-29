import React from 'react';

import PaneTypeSelector from './PaneTypeSelector';
import PaneCodeLocationSelector from './PaneCodeLocationSelector';
import ButtonWrapper from './ButtonWrapper';

// This class represents the header of a pane, which allows the user to change
// the pane's settings and deactivate it.
export default React.createClass({
  setInactive: function() {
    this.props.setActive(false);
  },

  render: function() {
    return (
      <div className='header'>
        <PaneTypeSelector
          type={this.props.type}
          setType={this.props.setType}
          setCodeLocation={this.props.setCodeLocation}
        />
        <PaneCodeLocationSelector
          type={this.props.type}
          codeLocation={this.props.codeLocation}
          setCodeLocation={this.props.setCodeLocation}
        />
        <ButtonWrapper
          position='center-y right'
          content='X'
          onClick={this.setInactive}
          showButton
        />
      </div>
    );
  }
});
