import React from 'react';

import PaneHeader from './PaneHeader';
import Pane from './Pane';
import ButtonWrapper from './ButtonWrapper';

// This class contains a pane's header and content. If the pane is inactive,
// it allows the user to reactivate the pane.
export default class PaneContainer extends React.Component {
  render() {
    const {
      pane,
      setActive,
      setType,
      setCodeLocation,
    } = this.props;

    if (pane.active) {
      return (
        <div className='pane'>
          <PaneHeader
            id={pane.id}
            type={pane.type}
            setActive={setActive}
            setType={setType}
            setCodeLocation={setCodeLocation}
          />
          <Pane
            type={pane.type}
            content={pane.content}
          />
        </div>
      );
    } else {
      return (
        <div className='pane inactive'>
          <ButtonWrapper
            position='center-x center-y'
            content='+'
            onClick={_ => setActive(pane.id, true)}
            showButton
          />
        </div>
      );
    }
  }
}
