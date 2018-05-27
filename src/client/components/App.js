import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import GameStatus from './GameStatus';
import LastMove from './LastMove';
import makeMove from '../actions';

import '../app.css';

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

  render() {
    return (
      <div>
        <h1>Game of Three</h1>
        <LastMove
          hasTurn={this.props.hasTurn}
          currentNumber={this.props.currentNumber}
          previousNumber={this.props.previousNumber}
          requiredDivisor={REQUIRED_DIVISOR}
        />
        <GameStatus hasTurn={this.props.hasTurn} isGameOver={this.props.isGameOver} />
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
