import { expect } from 'chai';
import numberPickerReducer from '../../src/client/reducers/numberPickerReducer';

describe('number picker reducer', () => {
  it('returns the initial state', () => {
    const state = undefined;
    const action = {};

    expect(numberPickerReducer(state, action)).to.deep.equal({
      newNumber: null,
      errorMessage: ''
    });
  });

  it('handles UPDATE_NUMBER', () => {
    const state = {
      newNumber: 3498,
      errorMessage: 'Some previous error message'
    };
    const action = {
      type: 'UPDATE_NUMBER',
      newNumber: 42
    };

    expect(numberPickerReducer(state, action)).to.deep.equal({
      newNumber: 42,
      errorMessage: 'Some previous error message'
    });
  });

  it('handles SET_ERROR', () => {
    const state = {
      newNumber: 132,
      errorMessage: ''
    };
    const action = {
      type: 'SET_ERROR',
      errorMessage: 'A new error message'
    };

    expect(numberPickerReducer(state, action)).to.deep.equal({
      newNumber: 132,
      errorMessage: 'A new error message'
    });
  });

  it('handles UNSET_ERROR', () => {
    const state = {
      newNumber: 39,
      errorMessage: 'Previous error message'
    };
    const action = {
      type: 'UNSET_ERROR'
    };

    expect(numberPickerReducer(state, action)).to.deep.equal({
      newNumber: 39,
      errorMessage: ''
    });
  });
});
