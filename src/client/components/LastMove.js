import React from 'react';
import PropTypes from 'prop-types';

import '../styles/lastMove.scss';

function getLastMove(previousNumber, currentNumber, requiredDivisor) {
  if (!previousNumber) {
    return null;
  }

  const adjustmentValue = currentNumber * requiredDivisor - previousNumber;
  const operator = adjustmentValue < 0 ? '-' : '+';

  return (
    <span className="lastMove-equation">
      <span className="lastMove-equationFraction">
        <span className="lastMove-equationFractionTop">
          <span className="lastMove-equationFractionTopParenthesis">(</span>
          {previousNumber} {operator} {Math.abs(adjustmentValue)}
          <span className="lastMove-equationFractionTopParenthesis">)</span>
        </span>
        <span className="lastMove-equationFractionSlash"> / </span>
        <span>{requiredDivisor}</span>
      </span>
      <span className="lastMove-equationEquals"> = </span>
    </span>
  );
}

function LastMove({
  hasTurn, previousNumber, currentNumber, requiredDivisor
}) {
  if (hasTurn === null) {
    return null;
  }

  return (
    <div>
      {currentNumber ? (
        <h2 className="lastMove-title">{hasTurn ? 'Their' : 'Your'} move:</h2>
      ) : null}
      <div className="lastMove-content">
        {getLastMove(previousNumber, currentNumber, requiredDivisor)}
        <span className="lastMove-result">{currentNumber || '?'}</span>
      </div>
    </div>
  );
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
