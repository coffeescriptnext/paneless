import React from 'react';
import PureComponent from 'react-pure-render/component';

import ButtonWrapper from './ButtonWrapper';

// Settings in the footer that let the user refresh the content, and choose
// whether or not the content will be refreshed automatically while typing.
export default class RefreshSettings extends PureComponent {
  render() {
    const {
      refresh,
      autoRefresh,
      setAutoRefresh,
    } = this.props;

    return (
      <div className='pane'>
        <ButtonWrapper
          position='left center-y'
          content='Refresh'
          onClick={this.props.refresh}
          showButton
          largeButton
        />
        <div>
          <input
            type='checkbox'
            checked={autoRefresh}
            onChange={e => setAutoRefresh(e.target.checked)}
          />
          Automatically refresh the page on edit
        </div>
      </div>
    );
  }
}
