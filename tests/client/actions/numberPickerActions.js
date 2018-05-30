import { expect } from 'chai';
import {
  updateNumber,
  setError,
  unsetError
} from '../../../src/client/actions/numberPickerActions';

describe('number picker actions', () => {
  it('create an action to update the number string', () => {
    const action = updateNumber(3498);

    expect(action).to.deep.equal({
      type: 'UPDATE_NUMBER',
      newNumber: 3498
    });
  });

  it('create an action to set the error message', () => {
    const action = setError('Some test error message');

    expect(action).to.deep.equal({
      type: 'SET_ERROR',
      errorMessage: 'Some test error message'
    });
  });

  it('create an action to unset the error message', () => {
    const action = unsetError();

    expect(action).to.deep.equal({
      type: 'UNSET_ERROR'
    });
  });
});
