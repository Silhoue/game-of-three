import React from 'react';
import PropTypes from 'prop-types';

function getStatus(hasTurn, isGameOver) {
  if (hasTurn === null) {
    return 'Waiting for the second player...';
  }

  if (isGameOver) {
    return hasTurn ? 'You lost!' : 'You won!';
  }

  return hasTurn ? 'You are thinking...' : 'Your opponent is thinking...';
}

function Status({ hasTurn, isGameOver }) {
  return <p>{getStatus(hasTurn, isGameOver)}</p>;
}

Status.propTypes = {
  hasTurn: PropTypes.bool,
  isGameOver: PropTypes.bool.isRequired
};

Status.defaultProps = {
  hasTurn: null
};

export default Status;
