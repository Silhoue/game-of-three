const express = require('express');
const playersHandler = require('./playersHandler');

const PORT = 8080;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', playersHandler.welcomePlayer);

app.use(express.static('dist'));
server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
