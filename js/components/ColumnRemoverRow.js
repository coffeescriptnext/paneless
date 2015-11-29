import React from 'react';

import { range } from '../util';

import ButtonWrapper from './ButtonWrapper';
import RowColumnController from './RowColumnController';

// This class represents the row at the top of the screen that contains the
// column removal buttons for each column.
export default React.createClass({
  addCol: function(col) {
    this.props.addCol(col);
  },

  removeCol: function(col) {
    this.props.removeCol(col);
  },

  render: function() {
    // This <button> keeps the column remover buttons in line with the columns.
    var emptyRowRemover = (
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
        {range(this.props.cols).map(function(col) {
          return (
            <RowColumnController
              orientation='row'
              isFirst={col === 0}
              allowRemoval={this.props.cols > 1}
              addBefore={this.addCol.bind(this, col)}
              addAfter={this.addCol.bind(this, col + 1)}
              remove={this.removeCol.bind(this, col)}
            />
          );
        }, this)}
      </div>
    );
  }
});
