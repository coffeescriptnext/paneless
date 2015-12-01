import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import root from './reducers';
import Paneless from './components/Paneless';

const store = createStore(root);

// Render the top-level class of the application.
ReactDOM.render(
  <Provider store={store}>
    <Paneless />
  </Provider>,
  document.getElementById('root')
);
