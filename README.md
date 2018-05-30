# Game or Three

A simple browser game with two players communicating through a server application.

## Stack

React, Redux; Node.js, Express, Socket.io; Mocha, Enzyme, Sinon, Chai; Nodemon, Webpack, Babel, Sass

Built with [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack) boilerplate.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Silhoue/game-of-three

# Go inside the directory
cd game-of-three

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Improvement ideas

* [Server] handle "cheating" players (making move outside of their turn, sending wrong number)
* [Server] handle players disconnecting before the end of the game (quit button, close/refresh window)
* [Client] add "play again" option
* [Client] display full move history
* measure & increase test coverage
