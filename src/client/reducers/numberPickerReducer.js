const initialState = {
  newNumber: null,
  errorMessage: ''
};

export default function numberPickerReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NUMBER':
      return Object.assign({}, state, { newNumber: action.newNumber });
    case 'SET_ERROR':
      return Object.assign({}, state, { errorMessage: action.errorMessage });
    case 'UNSET_ERROR':
      return Object.assign({}, state, { errorMessage: '' });
    default:
      return state;
  }
}
