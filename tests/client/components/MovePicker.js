import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import MovePicker from '../../../src/client/components/MovePicker';

describe('<MovePicker/>', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  describe('when current number is provided', () => {
    let wrapper;
    let handleMoveSubmitSpy;

    before(() => {
      handleMoveSubmitSpy = sinon.spy();
      wrapper = shallow(<MovePicker currentNumber={17} handleMoveSubmit={handleMoveSubmitSpy} />);
      clock.next();
    });

    it('renders as one <p> tag', () => {
      expect(wrapper.is('p')).to.equal(true);
    });

    it('calls move submit callback', () => {
      expect(handleMoveSubmitSpy.called).to.equal(true);
    });
  });

  describe('when no current number is provided', () => {
    let wrapper;
    let handleMoveSubmitSpy;

    before(() => {
      handleMoveSubmitSpy = sinon.spy();
      wrapper = shallow(<MovePicker currentNumber={null} handleMoveSubmit={handleMoveSubmitSpy} />);
      clock.next();
    });

    it('renders as one <Connect(NumberPicker)> tag', () => {
      expect(wrapper.is('Connect(NumberPicker)')).to.equal(true);
    });

    it('does not call move submit callback', () => {
      expect(handleMoveSubmitSpy.called).to.equal(false);
    });
  });
});
