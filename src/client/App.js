import React, { Component } from 'react';
import io from 'socket.io-client';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { socketId: null };
  }

  componentDidMount() {
    const socket = io.connect();
    socket.on('message', ({ socketId }) => {
      this.setState({ socketId });
    });
  }

  render() {
    return (
      <div>
        {this.state.socketId ? (
          <h1>Connected as socket: {this.state.socketId}</h1>
        ) : (
          <h1>Loading... please wait!</h1>
        )}
      </div>
    );
  }
}
