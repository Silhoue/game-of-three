import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberPicker from './NumberPicker';
import { MOVE_DELAY, REQUIRED_DIVISOR } from '../config.json';

function getNextNumber(number) {
  return Math.round(number / REQUIRED_DIVISOR);
}

class MovePicker extends Component {
  componentDidMount() {
    const { currentNumber, handleMoveSubmit } = this.props;
    if (this.props.currentNumber) {
      setTimeout(() => {
        handleMoveSubmit(getNextNumber(currentNumber));
      }, MOVE_DELAY);
    }
  }

  render() {
    if (this.props.currentNumber) {
      return <p>Generating the number...</p>;
    }

    return <NumberPicker handleMoveSubmit={this.props.handleMoveSubmit} />;
  }
}

MovePicker.propTypes = {
  currentNumber: PropTypes.number,
  handleMoveSubmit: PropTypes.func.isRequired
};

MovePicker.defaultProps = {
  currentNumber: null
};

export default MovePicker;
