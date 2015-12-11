import React from 'react';

import PaneTypeSelector from './PaneTypeSelector';
import PaneCodeLocationSelector from './PaneCodeLocationSelector';
import ButtonWrapper from './ButtonWrapper';

// This class represents the header of a pane, which allows the user to change
// the pane's settings and deactivate it.
export default class PaneHeader extends React.Component {
  render() {
    const {
      id,
      type,
      codeLocation,
      setType,
      setCodeLocation,
      setActive,
    } = this.props;

    return (
      <div className='header'>
        <PaneTypeSelector
          type={type}
          setType={t => setType(id, t)}
          setCodeLocation={cl => setCodeLocation(id, cl)}
        />
        <PaneCodeLocationSelector
          type={type}
          codeLocation={codeLocation}
          setCodeLocation={cl => setCodeLocation(id, cl)}
        />
        <ButtonWrapper
          position='center-y right'
          content='X'
          onClick={_ => setActive(id, false)}
          showButton
        />
      </div>
    );
  }
}
