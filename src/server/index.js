const express = require('express');
const logger = require('./logger');

const PORT = 8080;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  logger.log(`player ${socket.id} connected`);
  socket.emit('message', { socketId: socket.id });
  socket.on('disconnect', () => {
    logger.log(`player ${socket.id} disconnected`);
  });
});

app.use(express.static('dist'));
server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
