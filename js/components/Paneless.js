import React from 'react';
import { connect } from 'react-redux';

import { GRID_ATTRIBUTE_DEFAULTS } from '../constants.js';

import PaneGrid from './PaneGrid';
import Footer from './Footer';

// The top-level class for the application's view.
class Paneless extends React.Component {
  render() {
    return(
      <div className='paneless'>
        <PaneGrid
        />
        <Footer
        />
      </div>
    );
  }
}

export default connect(x => x)(Paneless);
