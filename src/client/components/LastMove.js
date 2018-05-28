import React from 'react';
import PropTypes from 'prop-types';
import MoveEquation from './MoveEquation';

import '../styles/lastMove.scss';

function LastMove({
  hasTurn, currentNumber, previousNumber, requiredDivisor
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
        <MoveEquation
          currentNumber={currentNumber}
          previousNumber={previousNumber}
          requiredDivisor={requiredDivisor}
        />
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
