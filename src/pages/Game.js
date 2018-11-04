import React, { Component } from "react";
import Start from "../components/Start";
import PlayGame from "../components/PlayGame";
import GameDataQuery from "../components/GameDataQuery";

class Game extends Component {
  render() {
    const {
      location: {
        state: { createdByUser, userId, gameId = null }
      }
    } = this.props;

    return (
      <PlayGame userId={userId} gameId={gameId} createdByUser={createdByUser} />
    );
  }
}

export default Game;
