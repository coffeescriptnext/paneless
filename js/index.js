import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import root from './reducers';
import PaneGrid from './components/PaneGrid';
import Footer from './components/Footer';

// Apply our own version of redux-thunk to the store.
// TODO: replace with the redux-thunk package.
const store = applyMiddleware(
  o => next => action =>
    typeof action === 'function' ?
      action(o.dispatch, o.getState) :
      next(action)
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
