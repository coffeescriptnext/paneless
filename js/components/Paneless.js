import React from 'react';

import PaneGridModel from '../model.js';
import { GRID_ATTRIBUTE_DEFAULTS } from '../constants.js';

import PaneGrid from './PaneGrid';
import Footer from './Footer';

// The model that the application is based on.
var model = new PaneGridModel(2, 2, GRID_ATTRIBUTE_DEFAULTS);

// The top-level class for the application's view.
export default class Paneless extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model,
      autoRefresh: true,
    };
  }

  // This function should be called after the model has been updated.
  // It clears the timer that is set by setContent, so that the model is not
  // updated more than once.
  updateState() {
    var timer = this.inputTimer;
    if (typeof timer !== 'undefined') {
      clearTimeout(timer);
    }

    this.setState({
      model: model
    });
  }

  // Returns a function that applies the given arguments to the function fName
  // of the model, then updates the component's state.
  callModelFunction(fName) {
    return function() {
      // Call model's function fName on the given arguments.
      this.state.model[fName].apply(model, arguments);
      this.updateState();
    }.bind(this);
  }

  // When the user types in one of the <textarea> tags, the application will
  // wait for TYPING_TIMEOUT seconds before notifying React that the model has
  // been updated. If the user changes the model in the meantime, the timeout
  // will be reset.
  // If autoRefresh is set to false, the view will not be refreshed on changing
  // the contents of a pane. However, it will change on events such as
  // activating or deactivtating a pane, adding or removing a row or column, and
  // changing the type or code location of a pane.
  setContent(row, col, content) {
    model.setContent(row, col, content);

    if (this.state.autoRefresh) {
      var timer = this.inputTimer;
      if (typeof timer !== 'undefined') {
        clearTimeout(timer);
      }

      this.inputTimer = setTimeout(this.updateState, TYPING_TIMEOUT);
    }
  }

  // Sets whether the content will be automatically refreshed upon typing.
  setAutoRefresh(autoRefresh) {
    this.setState({
      autoRefresh: autoRefresh
    });
  }

  render() {
    return(
      <div className='paneless'>
        <PaneGrid
          model={this.state.model}
          callModelFunction={this.callModelFunction}
          setContent={this.setContent}
        />
        <Footer
          refresh={this.updateState}
          autoRefresh={this.state.autoRefresh}
          setAutoRefresh={this.setAutoRefresh}
        />
      </div>
    );
  }
}
