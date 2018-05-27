const logger = require('./logger');

const WINNING_NUMBER = 1;
let lonelyPlayer = null;

function introducePlayers(firstPlayer, secondPlayer) {
  logger.log(`introducing player ${firstPlayer.id} to player ${secondPlayer.id}`);

  let hasFirstPlayerTurn = true;
  function makeMove({ currentNumber }) {
    const isGameOver = currentNumber === WINNING_NUMBER;
    firstPlayer.emit('moved', { hasTurn: hasFirstPlayerTurn, currentNumber, isGameOver });
    secondPlayer.emit('moved', { hasTurn: !hasFirstPlayerTurn, currentNumber, isGameOver });
    hasFirstPlayerTurn = !hasFirstPlayerTurn;
  }

  firstPlayer.on('moving', makeMove);
  secondPlayer.on('moving', makeMove);
  makeMove({ currentNumber: null });
}

function welcomePlayer(newPlayer) {
  logger.log(`player ${newPlayer.id} connected`);

  if (lonelyPlayer) {
    introducePlayers(lonelyPlayer, newPlayer);
    lonelyPlayer = null;
  } else {
    lonelyPlayer = newPlayer;
  }

  newPlayer.on('disconnect', () => {
    logger.log(`player ${newPlayer.id} disconnected`);
  });
}

module.exports = { welcomePlayer, introducePlayers };
