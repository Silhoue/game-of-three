import { expect } from 'chai';
import gameReducer from '../../src/client/reducers/gameReducer';

describe('game reducer', () => {
  it('returns the initial state', () => {
    const state = undefined;
    const action = {};

    expect(gameReducer(state, action)).to.deep.equal({
      hasTurn: null,
      currentNumber: null,
      previousNumber: null,
      isGameOver: false
    });
  });

  it('handles MAKE_MOVE', () => {
    const state = {
      hasTurn: true,
      currentNumber: 123,
      previousNumber: null,
      isGameOver: false
    };
    const action = {
      type: 'MAKE_MOVE',
      hasTurn: false,
      currentNumber: 41,
      isGameOver: false
    };

    expect(gameReducer(state, action)).to.deep.equal({
      hasTurn: false,
      currentNumber: 41,
      previousNumber: 123,
      isGameOver: false
    });
  });
});
