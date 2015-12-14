import React from 'react';

import { range } from '../util';

import ButtonWrapper from './ButtonWrapper';
import RowColumnController from './RowColumnController';

// This class represents the row at the top of the screen that contains the
// column removal buttons for each column.
export default class ColumnRemoverRow extends React.Component {
  render() {
    const {
      cols,
      addCol,
      removeCol,
    } = this.props;

    // This <button> keeps the column remover buttons in line with the columns.
    const emptyRowRemover = (
      <div className='pane adder col'>
        <ButtonWrapper
          content='-'
          showButton={false}
        />
      </div>
    );

    return (
      <div className='pane-row adder'>
        {emptyRowRemover}
        {range(cols).map(function(col) {
          return (
            <RowColumnController
              orientation='row'
              isFirst={col === 0}
              allowRemoval={cols > 1}
              addBefore={_ => addCol(col)}
              addAfter={_ => addCol(col + 1)}
              remove={_ => removeCol(col)}
            />
          );
        })}
      </div>
    );
  }
}
