import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MAX_INITIAL_NUMBER, MIN_INITIAL_NUMBER } from '../config.json';
import { updateNumber, setError, unsetError } from '../actions/numberPickerActions';
import '../styles/numberPicker.scss';

function getInitialNumber() {
  const choicesCount = MAX_INITIAL_NUMBER - MIN_INITIAL_NUMBER + 1;
  return Math.floor(Math.random() * choicesCount) + MIN_INITIAL_NUMBER;
}

class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNumberSubmit = this.handleNumberSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatchUpdateNumber(getInitialNumber());
  }

  handleNumberChange(e) {
    const input = e.target;
    if (input.validity.valid) {
      this.props.dispatchUpdateNumber(input.value ? parseInt(input.value, 10) : null);
    }
  }

  handleNumberSubmit(e) {
    const {
      newNumber, dispatchSetError, dispatchUnsetError, handleMoveSubmit
    } = this.props;

    if (newNumber === null) {
      dispatchSetError('Provide a number');
    } else if (newNumber > MAX_INITIAL_NUMBER) {
      dispatchSetError(`${newNumber} is too big`);
    } else if (newNumber < MIN_INITIAL_NUMBER) {
      dispatchSetError(`${newNumber} is too small`);
    } else {
      dispatchUnsetError();
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
              value={this.props.newNumber !== null ? this.props.newNumber : ''}
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
  newNumber: PropTypes.number,
  errorMessage: PropTypes.string.isRequired,
  handleMoveSubmit: PropTypes.func.isRequired,
  dispatchUpdateNumber: PropTypes.func.isRequired,
  dispatchSetError: PropTypes.func.isRequired,
  dispatchUnsetError: PropTypes.func.isRequired
};

NumberPicker.defaultProps = {
  newNumber: null
};

const mapStateToProps = state => state.numberPicker;

const mapDispatchToProps = dispatch => ({
  dispatchUpdateNumber: newNumber => dispatch(updateNumber(newNumber)),
  dispatchSetError: errorMessage => dispatch(setError(errorMessage)),
  dispatchUnsetError: () => dispatch(unsetError())
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberPicker);
