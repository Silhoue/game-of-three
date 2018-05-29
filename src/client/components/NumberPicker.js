import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MAX_INITIAL_NUMBER, MIN_INITIAL_NUMBER } from '../config.json';
import '../styles/numberPicker.scss';

function getInitialNumber() {
  const choicesCount = MAX_INITIAL_NUMBER - MIN_INITIAL_NUMBER + 1;
  return Math.floor(Math.random() * choicesCount) + MIN_INITIAL_NUMBER;
}

class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNumber: getInitialNumber(),
      errorMessage: ''
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNumberSubmit = this.handleNumberSubmit.bind(this);
  }

  handleNumberChange(e) {
    const input = e.target;
    if (input.validity.valid) {
      this.setState({ newNumber: input.value });
    }
  }

  handleNumberSubmit(e) {
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
      this.props.handleMoveSubmit(parseInt(newNumber, 10));
    }

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <p className="numberPicker-description">
          Pick a number from&nbsp;{MIN_INITIAL_NUMBER} to&nbsp;{MAX_INITIAL_NUMBER}
        </p>
        <form onSubmit={this.handleNumberSubmit}>
          <div className="numberPicker-controls">
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={MAX_INITIAL_NUMBER.toString().length}
              className="numberPicker-value"
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
            <button className="numberPicker-submit">Start</button>
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
  handleMoveSubmit: PropTypes.func.isRequired
};

export default NumberPicker;
