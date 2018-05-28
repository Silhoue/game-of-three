import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MOVE_DELAY,
  MAX_INITIAL_NUMBER,
  MIN_INITIAL_NUMBER,
  REQUIRED_DIVISOR
} from '../config.json';
import '../styles/numberPicker.scss';

function getInitialNumber() {
  const choicesCount = MAX_INITIAL_NUMBER - MIN_INITIAL_NUMBER + 1;
  return Math.floor(Math.random() * choicesCount) + MIN_INITIAL_NUMBER;
}

function getNextNumber(number) {
  return Math.round(number / REQUIRED_DIVISOR);
}

class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNumber: getInitialNumber(),
      errorMessage: ''
    };
    this.onNumberChange = this.onNumberChange.bind(this);
    this.onNumberSubmit = this.onNumberSubmit.bind(this);
  }

  componentDidMount() {
    const { currentNumber, makeMove } = this.props;
    if (this.props.currentNumber) {
      window.setTimeout(() => {
        makeMove(getNextNumber(currentNumber));
      }, MOVE_DELAY);
    }
  }

  onNumberChange(e) {
    const input = e.target;
    if (input.validity.valid) {
      this.setState({ newNumber: input.value });
    }
  }

  onNumberSubmit() {
    const { newNumber } = this.state;

    let errorMessage = '';
    if (newNumber === '') {
      errorMessage = 'Provide a number';
    } else if (newNumber > MAX_INITIAL_NUMBER) {
      errorMessage = `${newNumber} is too big`;
    } else if (newNumber < MIN_INITIAL_NUMBER) {
      errorMessage = `${newNumber} is too small`;
    }

    this.setState({ errorMessage });
    if (!errorMessage) {
      this.props.makeMove(parseInt(newNumber, 10));
    }
  }

  render() {
    if (this.props.currentNumber) {
      return <p>Generating the number...</p>;
    }

    return (
      <div>
        <p className="numberPicker-description">
          Pick a number from&nbsp;{MIN_INITIAL_NUMBER} to&nbsp;{MAX_INITIAL_NUMBER}
        </p>
        <form>
          <div className="numberPicker-controls">
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={MAX_INITIAL_NUMBER.toString().length}
              className="numberPicker-value"
              value={this.state.newNumber}
              onChange={this.onNumberChange}
            />
            <button type="button" className="numberPicker-submit" onClick={this.onNumberSubmit}>
              Start
            </button>
          </div>
          {this.state.errorMessage && (
            <p className="numberPicker-errorMessage">{this.state.errorMessage}</p>
          )}
        </form>
      </div>
    );
  }
}

NumberPicker.propTypes = {
  currentNumber: PropTypes.number,
  makeMove: PropTypes.func.isRequired
};

NumberPicker.defaultProps = {
  currentNumber: null
};

export default NumberPicker;
