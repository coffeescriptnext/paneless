import React from 'react';

import { range } from '../util';

import ColumnRemoverRow from './ColumnRemoverRow';
import PaneRow from './PaneRow';

// This class represents a 2D grid of panes.
export default class PaneGrid extends React.Component {
  render() {
    var model = this.props.model;
    var callModelFunction = this.props.callModelFunction;

    return (
      <div className='pane-container'>
        <ColumnRemoverRow
          cols={model.cols}
          addCol={callModelFunction('addCol')}
          removeCol={callModelFunction('removeCol')}
        />
        {range(model.rows).map(function(row) {
          return (
            <PaneRow
              row={row}
              paneRow={model.grid[row]}
              moreThanOneRow={model.rows > 1}
              addRowAbove={callModelFunction('addRow').bind(this, row)}
              addRowBelow={callModelFunction('addRow').bind(this, row + 1)}
              removeRow={callModelFunction('removeRow').bind(this, row)}
              setActive={callModelFunction('setActive')}
              setType={callModelFunction('setType')}
              setCodeLocation={callModelFunction('setCodeLocation')}
              setContent={this.props.setContent}
            />
          );
        }, this)}
      </div>
    );
  }
}
