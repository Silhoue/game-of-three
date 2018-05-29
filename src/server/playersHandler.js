const logger = require('./logger');

const WINNING_NUMBER = 1;
let lonelyPlayer = null;

function introducePlayers(firstPlayer, secondPlayer) {
  logger.log(`introducing player ${firstPlayer.id} to player ${secondPlayer.id}`);

  let hasFirstPlayerTurn = true;

  function makeMove({ newNumber }) {
    const isGameOver = newNumber === WINNING_NUMBER;

    firstPlayer.emit('moved', {
      hasTurn: hasFirstPlayerTurn,
      currentNumber: newNumber,
      isGameOver
    });
    secondPlayer.emit('moved', {
      hasTurn: !hasFirstPlayerTurn,
      currentNumber: newNumber,
      isGameOver
    });

    if (isGameOver) {
      firstPlayer.disconnect(true);
      secondPlayer.disconnect(true);
    } else {
      hasFirstPlayerTurn = !hasFirstPlayerTurn;
    }
  }

  firstPlayer.on('moving', makeMove);
  secondPlayer.on('moving', makeMove);
  makeMove({ newNumber: null });
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
