import React, { Component } from 'react';
import io from 'socket.io-client';

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTurn: null,
      currentNumber: null,
      previousNumber: null,
      isGameOver: false
    };
  }

  componentDidMount() {
    const socket = io.connect();

    socket.on('moved', ({ hasTurn, currentNumber, isGameOver }) => {
      this.setState({
        hasTurn,
        currentNumber,
        previousNumber: this.state.currentNumber,
        isGameOver
      });
      if (hasTurn && !isGameOver) {
        window.setTimeout(() => {
          socket.emit('moving', { currentNumber: getNextNumber(currentNumber) });
        }, MOVE_DELAY);
      }
    });
  }

  render() {
    if (this.state.hasTurn === null) {
      return <h1>Waiting for the second player...</h1>;
    }

    const lastMove = this.state.currentNumber ? (
      <span>
        Last move ({this.state.hasTurn ? 'theirs' : 'yours'}): {this.state.previousNumber} =&gt;{' '}
        {this.state.currentNumber}
      </span>
    ) : (
      <span>Waiting for the first move</span>
    );

    if (this.state.isGameOver) {
      return (
        <div>
          {this.state.hasTurn ? <h1>You lost!</h1> : <h1>You won!</h1>}
          {lastMove}
        </div>
      );
    }

    return (
      <div>
        <h1>{this.state.hasTurn ? "It's your turn" : "It's their turn"}</h1>
        {lastMove}
      </div>
    );
  }
}
