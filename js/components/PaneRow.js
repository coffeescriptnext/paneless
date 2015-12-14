import React from 'react';

import { range } from '../util.js';

import RowColumnController from './RowColumnController';
import PaneContainer from './PaneContainer';

// This class represents one row of panes.
export default class PaneRow extends React.Component {
  render() {
    const {
      paneRow,
      isFirst,
      moreThanOneRow,
      addRowAbove,
      addRowBelow,
      removeRow,
      setActive,
      setType,
      setCodeLocation,
      setContent,
    } = this.props;

    return (
      <div className='pane-row'>
        <RowColumnController
          orientation='col'
          isFirst={isFirst}
          allowRemoval={moreThanOneRow}
          addBefore={addRowAbove}
          addAfter={addRowBelow}
          remove={removeRow}
        />
        {paneRow.map(function(pane) {
          return (
            <PaneContainer
              key={pane.id}
              pane={pane}
              setActive={setActive}
              setType={setType}
              setCodeLocation={setCodeLocation}
              setContent={setContent}
            />
          );
        })}
      </div>
    );
  }
}
