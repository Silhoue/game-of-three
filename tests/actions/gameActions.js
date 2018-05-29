import chai, { expect } from 'chai';
import makeMove from '../../src/client/actions/gameActions';

describe('game actions', () => {
  it('create an action to make move', () => {
    const action = makeMove({
      hasTurn: true,
      currentNumber: 456,
      isGameOver: false
    });

    expect(action).to.deep.equal({
      type: 'MAKE_MOVE',
      hasTurn: true,
      currentNumber: 456,
      isGameOver: false
    });
  });
});
