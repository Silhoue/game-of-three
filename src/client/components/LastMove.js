import React from 'react';
import PropTypes from 'prop-types';
import { REQUIRED_DIVISOR } from '../config.json';
import MoveEquation from './MoveEquation';
import '../styles/lastMove.scss';

function getAdjustmentValue(previousNumber, currentNumber) {
  return currentNumber * REQUIRED_DIVISOR - previousNumber;
}

function LastMove({ hasTurn, currentNumber, previousNumber }) {
  if (hasTurn === null) {
    return null;
  }

  return (
    <div>
      {currentNumber ? (
        <h2 className="lastMove-title">{hasTurn ? 'Their' : 'Your'} move:</h2>
      ) : null}
      <div className="lastMove-content">
        {previousNumber && (
          <MoveEquation
            previousNumber={previousNumber}
            adjustmentValue={getAdjustmentValue(previousNumber, currentNumber)}
            divisor={REQUIRED_DIVISOR}
          />
        )}
        <span className="lastMove-result">{currentNumber || '?'}</span>
      </div>
    </div>
  );
}

LastMove.propTypes = {
  hasTurn: PropTypes.bool,
  currentNumber: PropTypes.number,
  previousNumber: PropTypes.number
};

LastMove.defaultProps = {
  hasTurn: null,
  currentNumber: null,
  previousNumber: null
};

export default LastMove;
