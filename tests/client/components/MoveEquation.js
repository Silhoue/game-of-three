import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MoveEquation from '../../../src/client/components/MoveEquation';

describe('<MoveEquation/>', () => {
  it('renders an equation with positive adjustment', () => {
    const wrapper = shallow(<MoveEquation previousNumber={14} adjustmentValue={1} divisor={5} />);
    expect(wrapper.text()).to.equal('(14 + 1) / 5 = ');
  });

  it('renders an equation with zero adjustment', () => {
    const wrapper = shallow(<MoveEquation previousNumber={23} adjustmentValue={0} divisor={1} />);
    expect(wrapper.text()).to.equal('(23 + 0) / 1 = ');
  });

  it('renders an equation with negative adjustment', () => {
    const wrapper = shallow(<MoveEquation previousNumber={19} adjustmentValue={-1} divisor={3} />);
    expect(wrapper.text()).to.equal('(19 - 1) / 3 = ');
  });
});
