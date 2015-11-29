import React from 'react';

import ButtonWrapper from './ButtonWrapper';
import RefreshSettings from './RefreshSettings';

// Represents the footer div.
export default React.createClass({
  render: function() {
    // This <div> is used to keep the actual footer content in line with the
    // panes, leaving the space below the row-remover buttons blank.
    var emptyRowRemover = (
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
          refresh={this.props.refresh}
          autoRefresh={this.props.autoRefresh}
          setAutoRefresh={this.props.setAutoRefresh}
        />
      </div>
    );
  }
});
