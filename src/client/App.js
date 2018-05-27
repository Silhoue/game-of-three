import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import makeMove from './actions';

import './app.css';

const MOVE_DELAY = 3000;
const MAX_INITIAL_NUMBER = 500;
const MIN_INITIAL_NUMBER = 10;
const REQUIRED_DIVISOR = 3;

function getInitialNumber() {
  const choicesCount = MAX_INITIAL_NUMBER - MIN_INITIAL_NUMBER + 1;
  return Math.floor(Math.random() * choicesCount) + MIN_INITIAL_NUMBER;
}

function getNextNumber(number) {
  return number === null ? getInitialNumber() : Math.round(number / REQUIRED_DIVISOR);
}

class App extends Component {
  componentDidMount() {
    const socket = io.connect();

    socket.on('moved', ({ hasTurn, currentNumber, isGameOver }) => {
      this.props.dispatchMakeMove(hasTurn, currentNumber, isGameOver);
      if (hasTurn && !isGameOver) {
        window.setTimeout(() => {
          socket.emit('moving', { currentNumber: getNextNumber(currentNumber) });
        }, MOVE_DELAY);
      }
    });
  }

  getLastMove() {
    if (this.props.previousNumber === null) {
      return this.props.currentNumber || '';
    }

    const adjustmentValue = this.props.currentNumber * REQUIRED_DIVISOR - this.props.previousNumber;
    const operationString = adjustmentValue < 0 ? `- ${-adjustmentValue}` : `+ ${adjustmentValue}`;

    return `(${this.props.previousNumber} ${operationString}) / ${REQUIRED_DIVISOR} = ${
      this.props.currentNumber
    }`;
  }

  render() {
    if (this.props.hasTurn === null) {
      return <h1>Waiting for the second player...</h1>;
    }

    const lastMove = this.props.currentNumber ? (
      <span>
        Last move ({this.props.hasTurn ? 'theirs' : 'yours'}): {this.getLastMove()}
      </span>
    ) : (
      <span>Waiting for the first move</span>
    );

    if (this.props.isGameOver) {
      return (
        <div>
          {this.props.hasTurn ? <h1>You lost!</h1> : <h1>You won!</h1>}
          {lastMove}
        </div>
      );
    }

    return (
      <div>
        <h1>{this.props.hasTurn ? "It's your turn" : "It's their turn"}</h1>
        {lastMove}
      </div>
    );
  }
}

App.propTypes = {
  hasTurn: PropTypes.bool,
  currentNumber: PropTypes.number,
  previousNumber: PropTypes.number,
  isGameOver: PropTypes.bool.isRequired,
  dispatchMakeMove: PropTypes.func.isRequired
};

App.defaultProps = {
  hasTurn: null,
  currentNumber: null,
  previousNumber: null
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  dispatchMakeMove: (...args) => dispatch(makeMove(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
