import React from 'react';

export default class TextareaWrapper extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.placeholder !== nextProps.placeholder ||
      this.props.value !== nextProps.value
    );
  }

  render() {
    return <textarea {...this.props} />;
  }
}
