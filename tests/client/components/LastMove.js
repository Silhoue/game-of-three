import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LastMove from '../../../src/client/components/LastMove';

describe('<LastMove/>', () => {
  it('renders current number', () => {
    const wrapper = shallow(<LastMove hasTurn currentNumber={3} previousNumber={10} />);
    expect(wrapper.text()).to.contain('3');
  });

  it('renders <MoveEquation /> when previous number provided', () => {
    const wrapper = shallow(<LastMove hasTurn currentNumber={13} previousNumber={39} />);
    expect(wrapper.text()).to.contain('<MoveEquation />');
  });

  it('does not render <MoveEquation /> when no previous number provided', () => {
    const wrapper = shallow(<LastMove hasTurn currentNumber={13} previousNumber={null} />);
    expect(wrapper.text()).to.not.contain('<MoveEquation />');
  });

  it('does not render when no turn is provided', () => {
    const wrapper = shallow(<LastMove hasTurn={null} currentNumber={null} previousNumber={null} />);
    expect(wrapper.isEmptyRender()).to.equal(true);
  });
});
