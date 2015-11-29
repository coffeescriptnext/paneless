import React from 'react';

import PaneHeader from './PaneHeader';
import Pane from './Pane';
import ButtonWrapper from './ButtonWrapper';

// This class contains a pane's header and content. If the pane is inactive,
// it allows the user to reactivate the pane.
export default React.createClass({
  setActive: function(active) {
    this.props.setActive(this.props.row, this.props.col, active);
  },

  // handleEvent is a generic event-handling function. It allows event-handling
  // functions that are called with row and column numbers to be easily called
  // without wrappers for each one.
  handleEvent: function(f) {
    return function(val) {
      f(this.props.row, this.props.col, val);
    }.bind(this);
  },

  render: function() {
    var pane = this.props.pane;

    if (pane.active) {
      return (
        <div className='pane'>
          <PaneHeader
            type={pane.type}
            codeLocation={pane.codeLocation}
            setActive={this.handleEvent(this.props.setActive)}
            setType={this.handleEvent(this.props.setType)}
            setCodeLocation={this.handleEvent(this.props.setCodeLocation)}
          />
          <Pane
            type={pane.type}
            content={pane.content}
            setContent={this.handleEvent(this.props.setContent)}
          />
        </div>
      );
    } else {
      return (
        <div className='pane inactive'>
          <ButtonWrapper
            position='center-x center-y'
            content='+'
            onClick={this.setActive.bind(this, true)}
            showButton
          />
        </div>
      );
    }
  }
});
