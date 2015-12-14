import React from 'react';
import { connect } from 'react-redux';

import ButtonWrapper from './ButtonWrapper';
import RefreshSettings from './RefreshSettings';

import {
  refresh,
  setAutoRefresh,
} from '../actions'

// Represents the footer div.
class Footer extends React.Component {
  render() {
    const {
      dispatch,
      autoRefresh,
    } = this.props;

    // This <div> is used to keep the actual footer content in line with the
    // panes, leaving the space below the row-remover buttons blank.
    const emptyRowRemover = (
      <div className='pane adder col'>
        <ButtonWrapper
          content='-'
          showButton={false}
        />
      </div>
    );

    return (
      <div className='footer'>
        {emptyRowRemover}
        <RefreshSettings
          refresh={_ => dispatch(refresh())}
          autoRefresh={autoRefresh}
          setAutoRefresh={value => dispatch(setAutoRefresh(value))}
        />
      </div>
    );
  }
}

export default connect(state => state.ui)(Footer);
