import React from 'react';
import ReactDOM from 'react-dom';

import PaneGridModel from './model';

import {
  TYPING_TIMEOUT,
  CODE_LOCATION_DEFAULTS,
  GRID_ATTRIBUTE_DEFAULTS,
  PANE_TYPE_FULL_NAMES,
  PANE_CODE_LOCATIONS,
} from './constants.js';

import {
  range,
} from './util.js';

// This class represents the <textarea> or <iframe> tag inside a pane.
var Pane = React.createClass({
  setContent: function(event) {
    this.props.setContent(event.target.value);
  },

  render: function() {
    var type = this.props.type;
    var content = this.props.content;

    if (type === 'output') {
      return (
        <iframe
          className='content'
          srcDoc={content}
        />
      );
    } else {
      return (
        <textarea
          className='content'
          placeholder={PANE_TYPE_FULL_NAMES[type]}
          defaultValue={content}
          onChange={this.setContent}
        />
      );
    }
  }
});

// This class represents the <select> tag that lets the user choose the type of
// a pane (HTML, CSS, Javascript, or output).
var PaneTypeSelector = React.createClass({
  setType: function(event) {
    var type = event.target.value;
    this.props.setType(type);

    // Update this pane's code location to the default for the new type.
    // Otherwise, the current code location could be invalid for the new type.
    // For example, if the user changes an HTML pane to a CSS pane, the 'body'
    // code location would not be listed in the pane's PaneTypeSelector. The
    // view and model would therefore be out of sync.
    this.props.setCodeLocation(CODE_LOCATION_DEFAULTS[type]);
  },

  render: function() {
    return (
      <select value={this.props.type} onChange={this.setType}>
        {Object.keys(PANE_TYPE_FULL_NAMES).map(function(k) {
          return (
            <option value={k}>
              {PANE_TYPE_FULL_NAMES[k]}
            </option>
          );
        }, this)}
      </select>
    );
  }
});

// This class represents the <select> tag that lets the user choose the code
// location of a pane.
var PaneCodeLocationSelector = React.createClass({
  setCodeLocation: function(event) {
    this.props.setCodeLocation(event.target.value);
  },

  render: function() {
    // typeCodeLocations contains the valid code locations for the pane's
    // current type.
    var typeCodeLocations = PANE_CODE_LOCATIONS[this.props.type];
    var typeCodeLocationsKeys = Object.keys(typeCodeLocations);

    // If the current pane type has no associated code locations (e.g. an output
    // pane), do not return an element.
    if (typeCodeLocationsKeys.length === 0) {
      return false;
    } else {
      return (
        <select value={this.props.codeLocation} onChange={this.setCodeLocation}>
          {typeCodeLocationsKeys.map(function(k) {
            return (
              <option value={k}>
                {typeCodeLocations[k]}
              </option>
            );
          })}
        </select>
      );
    }
  }
});

// This class is a wrapper for a <button> tag. The button can be visible or
// hidden, and the button's text can be small or large. The button itself can
// also be assigned a class, an onclick function, and text or HTML content.
var ButtonWrapper = React.createClass({
  render: function() {
    var className = (this.props.showButton ? this.props.position : 'hidden')
      + (this.props.largeButton ? ' large' : '');

    return (
      <div className='flex'>
        <button
          className={className}
          onClick={this.props.onClick}
        >
          {this.props.content}
        </button>
      </div>
    );
  }
});

// This class represents the header of a pane, which allows the user to change
// the pane's settings and deactivate it.
var PaneHeader = React.createClass({
  setInactive: function() {
    this.props.setActive(false);
  },

  render: function() {
    return (
      <div className='header'>
        <PaneTypeSelector
          type={this.props.type}
          setType={this.props.setType}
          setCodeLocation={this.props.setCodeLocation}
        />
        <PaneCodeLocationSelector
          type={this.props.type}
          codeLocation={this.props.codeLocation}
          setCodeLocation={this.props.setCodeLocation}
        />
        <ButtonWrapper
          position='center-y right'
          content='X'
          onClick={this.setInactive}
          showButton
        />
      </div>
    );
  }
});

// This class contains a pane's header and content. If the pane is inactive,
// it allows the user to reactivate the pane.
var PaneContainer = React.createClass({
  setActive: function(active) {
    this.props.setActive(this.props.row, this.props.col, active);
  },

  // handleEvent is a generic event-handling function. It allows event-handling
  // functions that are called with row and column numbers to be easily called
  // without wrappers for each one.
  handleEvent: function(f) {
    return function(val) {
      f(this.props.row, this.props.col, val);
    }.bind(this);
  },

  render: function() {
    var pane = this.props.pane;

    if (pane.active) {
      return (
        <div className='pane'>
          <PaneHeader
            type={pane.type}
            codeLocation={pane.codeLocation}
            setActive={this.handleEvent(this.props.setActive)}
            setType={this.handleEvent(this.props.setType)}
            setCodeLocation={this.handleEvent(this.props.setCodeLocation)}
          />
          <Pane
            type={pane.type}
            content={pane.content}
            setContent={this.handleEvent(this.props.setContent)}
          />
        </div>
      );
    } else {
      return (
        <div className='pane inactive'>
          <ButtonWrapper
            position='center-x center-y'
            content='+'
            onClick={this.setActive.bind(this, true)}
            showButton
          />
        </div>
      );
    }
  }
});

// This class allows the user to remove the associated row or column, and to add
// rows or columns before and/or after it.
var RowColumnController = React.createClass({
  render: function() {
    var isRow = this.props.orientation === 'row';
    var beforePos = isRow ? 'center-y left' : 'center-x top';
    var afterPos = isRow ? 'center-y right' : 'center-x bottom';

    return (
      <div className={'pane adder ' + this.props.orientation}>
        <ButtonWrapper
          position={beforePos}
          content='+'
          onClick={this.props.addBefore}
          showButton={this.props.isFirst}
        />
        <ButtonWrapper
          position='center-x center-y'
          content='-'
          onClick={this.props.remove}
          showButton={this.props.allowRemoval}
        />
        <ButtonWrapper
          position={afterPos}
          content='+'
          onClick={this.props.addAfter}
          showButton
        />
      </div>
    );
  }
});

// This class represents the row at the top of the screen that contains the
// column removal buttons for each column.
var ColumnRemoverRow = React.createClass({
  addCol: function(col) {
    this.props.addCol(col);
  },

  removeCol: function(col) {
    this.props.removeCol(col);
  },

  render: function() {
    // This <button> keeps the column remover buttons in line with the columns.
    var emptyRowRemover = (
      <div className='pane adder col'>
        <ButtonWrapper
          content='-'
          showButton={false}
        />
      </div>
    );

    return (
      <div className='pane-row adder'>
        {emptyRowRemover}
        {range(this.props.cols).map(function(col) {
          return (
            <RowColumnController
              orientation='row'
              isFirst={col === 0}
              allowRemoval={this.props.cols > 1}
              addBefore={this.addCol.bind(this, col)}
              addAfter={this.addCol.bind(this, col + 1)}
              remove={this.removeCol.bind(this, col)}
            />
          );
        }, this)}
      </div>
    );
  }
});

// This class represents one row of panes.
var PaneRow = React.createClass({
  render: function() {
    var paneRow = this.props.paneRow;

    return (
      <div className='pane-row'>
        <RowColumnController
          orientation='col'
          isFirst={this.props.row === 0}
          allowRemoval={this.props.moreThanOneRow}
          addBefore={this.props.addRowAbove}
          addAfter={this.props.addRowBelow}
          remove={this.props.removeRow}
        />
        {range(paneRow.length).map(function(col) {
          return (
            <PaneContainer
              row={this.props.row}
              col={col}
              pane={paneRow[col]}
              setActive={this.props.setActive}
              setType={this.props.setType}
              setCodeLocation={this.props.setCodeLocation}
              setContent={this.props.setContent}
            />
          );
        }, this)}
      </div>
    );
  }
});

// This class represents a 2D grid of panes.
var PaneGrid = React.createClass({
  render: function() {
    var model = this.props.model;
    var callModelFunction = this.props.callModelFunction;

    return (
      <div className='pane-container'>
        <ColumnRemoverRow
          cols={model.cols}
          addCol={callModelFunction('addCol')}
          removeCol={callModelFunction('removeCol')}
        />
        {range(model.rows).map(function(row) {
          return (
            <PaneRow
              row={row}
              paneRow={model.grid[row]}
              moreThanOneRow={model.rows > 1}
              addRowAbove={callModelFunction('addRow').bind(this, row)}
              addRowBelow={callModelFunction('addRow').bind(this, row + 1)}
              removeRow={callModelFunction('removeRow').bind(this, row)}
              setActive={callModelFunction('setActive')}
              setType={callModelFunction('setType')}
              setCodeLocation={callModelFunction('setCodeLocation')}
              setContent={this.props.setContent}
            />
          );
        }, this)}
      </div>
    );
  }
});

// Settings in the footer that let the user refresh the content, and choose
// whether or not the content will be refreshed automatically while typing.
var RefreshSettings = React.createClass({
  setAutoRefresh: function(event) {
    this.props.setAutoRefresh(event.target.checked);
  },

  render: function() {
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
});

// Represents the footer div.
var PanelessFooter = React.createClass({
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

// The model that the application is based on.
var model = new PaneGridModel(2, 2, GRID_ATTRIBUTE_DEFAULTS);

// The top-level class for the application's view.
var Paneless = React.createClass({
  getInitialState: function() {
    return {
      model: model,
      autoRefresh: true,
    };
  },

  // This function should be called after the model has been updated.
  // It clears the timer that is set by setContent, so that the model is not
  // updated more than once.
  updateState: function() {
    var timer = this.inputTimer;
    if (typeof timer !== 'undefined') {
      clearTimeout(timer);
    }

    this.setState({
      model: model
    });
  },

  // Returns a function that applies the given arguments to the function fName
  // of the model, then updates the component's state.
  callModelFunction: function(fName) {
    return function() {
      // Call model's function fName on the given arguments.
      this.state.model[fName].apply(model, arguments);
      this.updateState();
    }.bind(this);
  },

  // When the user types in one of the <textarea> tags, the application will
  // wait for TYPING_TIMEOUT seconds before notifying React that the model has
  // been updated. If the user changes the model in the meantime, the timeout
  // will be reset.
  // If autoRefresh is set to false, the view will not be refreshed on changing
  // the contents of a pane. However, it will change on events such as
  // activating or deactivtating a pane, adding or removing a row or column, and
  // changing the type or code location of a pane.
  setContent: function(row, col, content) {
    model.setContent(row, col, content);

    if (this.state.autoRefresh) {
      var timer = this.inputTimer;
      if (typeof timer !== 'undefined') {
        clearTimeout(timer);
      }

      this.inputTimer = setTimeout(this.updateState, TYPING_TIMEOUT);
    }
  },

  // Sets whether the content will be automatically refreshed upon typing.
  setAutoRefresh: function(autoRefresh) {
    this.setState({
      autoRefresh: autoRefresh
    });
  },

  render: function() {
    return(
      <div className='paneless'>
        <PaneGrid
          model={this.state.model}
          callModelFunction={this.callModelFunction}
          setContent={this.setContent}
        />
        <PanelessFooter
          refresh={this.updateState}
          autoRefresh={this.state.autoRefresh}
          setAutoRefresh={this.setAutoRefresh}
        />
      </div>
    );
  }
});

// Render the top-level class of the application.
ReactDOM.render(<Paneless />, document.getElementById('root'));
