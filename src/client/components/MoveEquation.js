import React from 'react';
import PropTypes from 'prop-types';

import '../styles/moveEquation.scss';

function MoveEquation({ currentNumber, previousNumber, requiredDivisor }) {
  if (!previousNumber) {
    return null;
  }

  const adjustmentValue = currentNumber * requiredDivisor - previousNumber;
  const operator = adjustmentValue < 0 ? '-' : '+';

  return (
    <span className="moveEquation">
      <span className="moveEquation-fraction">
        <span className="moveEquation-fractionTop">
          <span className="moveEquation-fractionTopParenthesis">(</span>
          {previousNumber} {operator} {Math.abs(adjustmentValue)}
          <span className="moveEquation-fractionTopParenthesis">)</span>
        </span>
        <span className="moveEquation-fractionSlash"> / </span>
        <span>{requiredDivisor}</span>
      </span>
      <span className="moveEquation-equals"> = </span>
    </span>
  );
}

MoveEquation.propTypes = {
  currentNumber: PropTypes.number,
  previousNumber: PropTypes.number,
  requiredDivisor: PropTypes.number.isRequired
};

MoveEquation.defaultProps = {
  currentNumber: null,
  previousNumber: null
};

export default MoveEquation;
