import React, { Component } from "react";

class Game extends Component {
  render() {
    const {
      location: {
        state: { createdByUser }
      }
    } = this.props;
    return (
      <div>
        <h3>You are in the lobby!</h3>
        {createdByUser && <button>Start Game</button>}
      </div>
    );
  }
}

export default Game;
