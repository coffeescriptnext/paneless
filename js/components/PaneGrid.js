import React from 'react';
import { connect } from 'react-redux';

import { range } from '../util';

import ColumnRemoverRow from './ColumnRemoverRow';
import PaneRow from './PaneRow';

import {
  setPaneProperty,
  addRow,
  addColumn,
  removeRow,
  removeColumn,
} from '../actions';

// This class represents a 2D grid of panes.
class PaneGrid extends React.Component {
  render() {
    const {
      dispatch,
      rows,
      cols,
      paneOrder,
      panes,
    } = this.props;

    return (
      <div className='pane-container'>
        <ColumnRemoverRow
          cols={cols}
          addCol={col => dispatch(addColumn(col))}
          removeCol={col => dispatch(removeColumn(col))}
        />
        {range(model.rows).map(function(row) {
          return (
            <PaneRow
              paneRow={panes.slice(row * cols, (row + 1) * cols)}
              isFirst={row === 0}
              moreThanOneRow={rows > 1}
              addRowAbove={_ => dispatch(addRow(row))}
              addRowBelow={_ => dispatch(addRow(row + 1))}
              removeRow={_ => dispatch(removeRow(row))}
              setActive={(id, value) =>
                dispatch(setPaneProperty(id, 'active', value))}
              setType={(id, value) =>
                dispatch(setPaneProperty(id, 'type', value))}
              setCodeLocation={(id, value) =>
                dispatch(setPaneProperty(id, 'codeLocation', value))}
            />
          );
        }, this)}
      </div>
    );
  }
}

export default connect(PaneGrid)(state => state.paneGrid);
