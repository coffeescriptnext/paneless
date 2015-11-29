import React from 'react';

import ButtonWrapper from './ButtonWrapper';

// Settings in the footer that let the user refresh the content, and choose
// whether or not the content will be refreshed automatically while typing.
export default class RefreshSettings extends React.Component {
  setAutoRefresh(event) {
    this.props.setAutoRefresh(event.target.checked);
  }

  render() {
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
            checked={this.props.autoRefresh}
            onChange={this.setAutoRefresh}
          />
          Automatically refresh the page on edit
        </div>
      </div>
    );
  }
}
