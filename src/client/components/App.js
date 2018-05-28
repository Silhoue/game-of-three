import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import GameStatus from './GameStatus';
import LastMove from './LastMove';
import NumberPicker from './NumberPicker';
import makeMove from '../actions';
import { MOVE_DELAY, REQUIRED_DIVISOR } from '../config.json';
import '../styles/app.scss';

function getNextNumber(number) {
  return Math.round(number / REQUIRED_DIVISOR);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.makeMove = this.makeMove.bind(this);
  }

  componentDidMount() {
    this.socket = io.connect();

    this.socket.on('moved', ({ hasTurn, currentNumber, isGameOver }) => {
      this.props.dispatchMakeMove(hasTurn, currentNumber, isGameOver);
      if (hasTurn && currentNumber && !isGameOver) {
        window.setTimeout(() => {
          this.makeMove(getNextNumber(currentNumber));
        }, MOVE_DELAY);
      }
    });
  }

  makeMove(newNumber) {
    this.socket.emit('moving', { currentNumber: newNumber });
  }

  render() {
    const {
      hasTurn, currentNumber, previousNumber, isGameOver
    } = this.props;
    return (
      <div className="app">
        <h1 className="app-title">Game of Three</h1>
        <div className="app-content">
          <LastMove
            hasTurn={hasTurn}
            currentNumber={currentNumber}
            previousNumber={previousNumber}
          />
          <div>
            <GameStatus hasTurn={hasTurn} isGameOver={isGameOver} />
            {hasTurn && !currentNumber ? <NumberPicker makeMove={this.makeMove} /> : null}
          </div>
        </div>
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
