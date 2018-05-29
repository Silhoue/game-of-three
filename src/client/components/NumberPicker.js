import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MAX_INITIAL_NUMBER, MIN_INITIAL_NUMBER } from '../config.json';
import { updateNumber, submitSuccess, submitFailure } from '../actions/numberPickerActions';
import '../styles/numberPicker.scss';

class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNumberSubmit = this.handleNumberSubmit.bind(this);
  }

  handleNumberChange(e) {
    const input = e.target;
    if (input.validity.valid) {
      this.props.dispatchUpdateNumber(parseInt(input.value, 10));
    }
  }

  handleNumberSubmit(e) {
    const {
      newNumber,
      dispatchSubmitFailure,
      dispatchSubmitSuccess,
      handleMoveSubmit
    } = this.props;

    if (newNumber === '') {
      dispatchSubmitFailure('Provide a number');
    } else if (newNumber > MAX_INITIAL_NUMBER) {
      dispatchSubmitFailure(`${newNumber} is too big`);
    } else if (newNumber < MIN_INITIAL_NUMBER) {
      dispatchSubmitFailure(`${newNumber} is too small`);
    } else {
      dispatchSubmitSuccess();
      handleMoveSubmit(newNumber);
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
              value={this.props.newNumber}
              onChange={this.handleNumberChange}
            />
            <button className="numberPicker-submit">Start</button>
          </div>
          {this.props.errorMessage && (
            <p className="numberPicker-errorMessage">{this.props.errorMessage}</p>
          )}
        </form>
      </div>
    );
  }
}

NumberPicker.propTypes = {
  newNumber: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleMoveSubmit: PropTypes.func.isRequired,
  dispatchUpdateNumber: PropTypes.func.isRequired,
  dispatchSubmitSuccess: PropTypes.func.isRequired,
  dispatchSubmitFailure: PropTypes.func.isRequired
};

const mapStateToProps = state => state.numberPicker;

const mapDispatchToProps = dispatch => ({
  dispatchUpdateNumber: number => dispatch(updateNumber(number)),
  dispatchSubmitSuccess: () => dispatch(submitSuccess()),
  dispatchSubmitFailure: errorMessage => dispatch(submitFailure(errorMessage))
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberPicker);
