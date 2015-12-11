import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import root from './reducers';
import PaneGrid from './components/PaneGrid';
import Footer from './components/Footer';

const store = createStore(root);

// Render the top-level class of the application.
ReactDOM.render(
  <Provider store={store}>
    <div>
      <PaneGrid />
      <Footer />
    </div>
  </Provider>,
  document.getElementById('root')
);
