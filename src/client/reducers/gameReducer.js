const initialState = {
  hasTurn: null,
  currentNumber: null,
  previousNumber: null,
  isGameOver: false
};

export default function gameReducer(state = initialState, action) {
  const {
    type, hasTurn, currentNumber, isGameOver
  } = action;
  switch (type) {
    case 'MAKE_MOVE':
      return {
        hasTurn,
        currentNumber,
        previousNumber: state.currentNumber,
        isGameOver
      };
    default:
      return state;
  }
}
