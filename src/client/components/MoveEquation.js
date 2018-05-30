import React from 'react';
import PropTypes from 'prop-types';
import '../styles/moveEquation.scss';

function MoveEquation({ previousNumber, adjustmentValue, divisor }) {
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
        <span>{divisor}</span>
      </span>
      <span className="moveEquation-equals"> = </span>
    </span>
  );
}

MoveEquation.propTypes = {
  previousNumber: PropTypes.number.isRequired,
  adjustmentValue: PropTypes.number.isRequired,
  divisor: PropTypes.number.isRequired
};

export default MoveEquation;
