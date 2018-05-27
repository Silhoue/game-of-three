import React from 'react';
import PropTypes from 'prop-types';

function getLastMove(previousNumber, currentNumber, requiredDivisor) {
  const adjustmentValue = currentNumber * requiredDivisor - previousNumber;
  const operationString = adjustmentValue < 0 ? `- ${-adjustmentValue}` : `+ ${adjustmentValue}`;

  return `(${previousNumber} ${operationString}) / ${REQUIRED_DIVISOR} = ${currentNumber}`;
}

function LastMove({
  hasTurn, previousNumber, currentNumber, requiredDivisor
}) {
  if (currentNumber) {
    return (
      <span>
        Last move ({hasTurn ? 'theirs' : 'yours'}):{' '}
        {previousNumber ? getLastMove(previousNumber, currentNumber, requiredDivisor) : currentNumber}
      </span>
    );
  }
  return <span>Waiting for the first move</span>;
}

LastMove.propTypes = {
  hasTurn: PropTypes.bool,
  currentNumber: PropTypes.number,
  previousNumber: PropTypes.number,
  requiredDivisor: PropTypes.number.isRequired
};

LastMove.defaultProps = {
  hasTurn: null,
  currentNumber: null,
  previousNumber: null
};

export default LastMove;
