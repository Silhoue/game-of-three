import { assert } from 'chai';
import { MAX_INITIAL_NUMBER, MIN_INITIAL_NUMBER } from '../../src/client/config.json';

describe('configuration', () => {
  it('defines initial number range', () => {
    assert.isAtLeast(MAX_INITIAL_NUMBER, MIN_INITIAL_NUMBER);
  });
});
