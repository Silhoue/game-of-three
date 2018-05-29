# Game or Three

A simple browser game with two players communicating through a server application.

## Stack

Node.js, Express, Socket.io; React, Redux; Mocha, Chai; Nodemon, Webpack, Babel, Sass

Built with [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack) boilerplate.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Silhoue/game-of-three

# Go inside the directory
cd game-of-three

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## Improvement ideas

Server

* handle "cheating" players (making move outside of their turn, sending wrong number)
* handle players disconnecting before the end of the game (quit button, close/refresh window)

Client

* add "play again" option
* display full move history
