import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import root from './reducers';
import PaneGrid from './components/PaneGrid';
import Footer from './components/Footer';

const store = applyMiddleware(
  thunk
)(createStore)(root);

// Render the top-level class of the application.
ReactDOM.render(
  <Provider store={store}>
    <div className='paneless'>
      <PaneGrid />
      <Footer />
    </div>
  </Provider>,
  document.getElementById('root')
);
