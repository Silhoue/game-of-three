const initialState = {
  hasTurn: null,
  currentNumber: null,
  previousNumber: null,
  isGameOver: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MAKE_MOVE':
      return {
        hasTurn: action.hasTurn,
        currentNumber: action.currentNumber,
        previousNumber: state.currentNumber,
        isGameOver: action.isGameOver
      };
    default:
      return state;
  }
}
