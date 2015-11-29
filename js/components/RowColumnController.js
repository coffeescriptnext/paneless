import React from 'react';

import ButtonWrapper from './ButtonWrapper';

// This class allows the user to remove the associated row or column, and to add
// rows or columns before and/or after it.
export default React.createClass({
  render: function() {
    var isRow = this.props.orientation === 'row';
    var beforePos = isRow ? 'center-y left' : 'center-x top';
    var afterPos = isRow ? 'center-y right' : 'center-x bottom';

    return (
      <div className={'pane adder ' + this.props.orientation}>
        <ButtonWrapper
          position={beforePos}
          content='+'
          onClick={this.props.addBefore}
          showButton={this.props.isFirst}
        />
        <ButtonWrapper
          position='center-x center-y'
          content='-'
          onClick={this.props.remove}
          showButton={this.props.allowRemoval}
        />
        <ButtonWrapper
          position={afterPos}
          content='+'
          onClick={this.props.addAfter}
          showButton
        />
      </div>
    );
  }
});
