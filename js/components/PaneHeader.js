import React from 'react';
import PureComponent from 'react-pure-render/component';

import PaneTypeSelector from './PaneTypeSelector';
import PaneCodeLocationSelector from './PaneCodeLocationSelector';
import ButtonWrapper from './ButtonWrapper';

// This class represents the header of a pane, which allows the user to change
// the pane's settings and deactivate it.
export default class PaneHeader extends PureComponent {
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
      <table className='header'>
        <tr>
          <td>
            <PaneTypeSelector
              type={type}
              setType={t => setType(id, t)}
              setCodeLocation={cl => setCodeLocation(id, cl)}
            />
          </td>
          <td>
            <PaneCodeLocationSelector
              type={type}
              codeLocation={codeLocation}
              setCodeLocation={cl => setCodeLocation(id, cl)}
            />
          </td>
          <td>
            <ButtonWrapper
              position='center-y right'
              content='X'
              onClick={_ => setActive(id, false)}
              showButton
            />
          </td>
        </tr>
      </table>
    );
  }
}
