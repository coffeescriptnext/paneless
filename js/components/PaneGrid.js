import React from 'react';
import { connect } from 'react-redux';

import { range } from '../util';

import ColumnRemoverRow from './ColumnRemoverRow';
import PaneRow from './PaneRow';

// This class represents a 2D grid of panes.
class PaneGrid extends React.Component {
  render() {
    const model = this.props.model;
    const callModelFunction = this.props.callModelFunction;

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

export default connect(PaneGrid)(state => state.paneGrid);
