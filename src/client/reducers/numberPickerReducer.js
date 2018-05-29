import { MAX_INITIAL_NUMBER, MIN_INITIAL_NUMBER } from '../config.json';

function getInitialNumber() {
  const choicesCount = MAX_INITIAL_NUMBER - MIN_INITIAL_NUMBER + 1;
  return Math.floor(Math.random() * choicesCount) + MIN_INITIAL_NUMBER;
}

const initialState = {
  newNumber: getInitialNumber(),
  errorMessage: ''
};

export default function numberPickerReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NUMBER':
      return Object.assign({}, state, { newNumber: action.number });
    case 'SUBMIT_SUCCESS':
      return initialState;
    case 'SUBMIT_FAILURE':
      return Object.assign({}, state, { errorMessage: action.errorMessage });
    default:
      return state;
  }
}
