import React from 'react';

import { range } from '../util.js';

import RowColumnController from './RowColumnController';
import PaneContainer from './PaneContainer';

// This class represents one row of panes.
export default class PaneRow extends React.Component {
  render() {
    const paneRow = this.props.paneRow;

    return (
      <div className='pane-row'>
        <RowColumnController
          orientation='col'
          isFirst={this.props.row === 0}
          allowRemoval={this.props.moreThanOneRow}
          addBefore={this.props.addRowAbove}
          addAfter={this.props.addRowBelow}
          remove={this.props.removeRow}
        />
        {range(paneRow.length).map(function(col) {
          return (
            <PaneContainer
              row={this.props.row}
              col={col}
              pane={paneRow[col]}
              setActive={this.props.setActive}
              setType={this.props.setType}
              setCodeLocation={this.props.setCodeLocation}
              setContent={this.props.setContent}
            />
          );
        }, this)}
      </div>
    );
  }
}
