import React from 'react';

import ButtonWrapper from './ButtonWrapper';

// Settings in the footer that let the user refresh the content, and choose
// whether or not the content will be refreshed automatically while typing.
export default class RefreshSettings extends React.Component {
  render() {
    const {
      refresh,
      autoRefresh,
      setAutoRefresh,
    } = props;

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
