import React from 'react';

import ButtonWrapper from './ButtonWrapper';

// This class allows the user to remove the associated row or column, and to add
// rows or columns before and/or after it.
export default class RowColumnController extends React.Component {
  render() {
    const {
      orientation,
      addBefore,
      isFirst,
      remove,
      allowRemoval,
      addAfter,
    } = this.props;

    var isRow = orientation === 'row';
    var beforePos = isRow ? 'center-y left' : 'center-x top';
    var afterPos = isRow ? 'center-y right' : 'center-x bottom';

    return (
      <div className={'pane adder ' + orientation}>
        <ButtonWrapper
          position={beforePos}
          content='+'
          onClick={addBefore}
          showButton={isFirst}
        />
        <ButtonWrapper
          position='center-x center-y'
          content='-'
          onClick={remove}
          showButton={allowRemoval}
        />
        <ButtonWrapper
          position={afterPos}
          content='+'
          onClick={addAfter}
          showButton
        />
      </div>
    );
  }
}
