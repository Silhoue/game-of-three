import React from 'react';
import PropTypes from 'prop-types';

function getStatus(hasTurn, isGameOver) {
  if (hasTurn === null) {
    return 'Waiting for the second player to join...';
  }

  if (isGameOver) {
    return hasTurn ? 'You lost!' : 'You won!';
  }

  return hasTurn ? "It's your turn!" : 'Waiting for your opponent to move...';
}

function GameStatus({ hasTurn, isGameOver }) {
  return <p>{getStatus(hasTurn, isGameOver)}</p>;
}

GameStatus.propTypes = {
  hasTurn: PropTypes.bool,
  isGameOver: PropTypes.bool.isRequired
};

GameStatus.defaultProps = {
  hasTurn: null
};

export default GameStatus;
