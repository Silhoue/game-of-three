export default function makeMove(hasTurn, currentNumber, isGameOver) {
  return {
    type: 'MAKE_MOVE',
    hasTurn,
    currentNumber,
    isGameOver
  };
}
