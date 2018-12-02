import React, { Component } from 'react';
import PlayGame from '../components/PlayGame';

class Game extends Component {
  render() {
    return (
      <>
        <PlayGame {...this.props.location.state} />
      </>
    );
  }
}

export default Game;
