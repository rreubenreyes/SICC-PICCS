import React, { Component } from "react";
import NumberPlayers from "./NumberPlayers";
import GameDataQuery from "./GameDataQuery";
import Start from "./Start";

class GamePending extends Component {
  render() {
    const { gameId, createdByUser, userId } = this.props;

    return (
      <>
        {createdByUser && (
          <GameDataQuery>
            {gameDataId => (
              <Start userId={userId} gameId={gameId} gameDataId={gameDataId} />
            )}
          </GameDataQuery>
        )}
        <h3>Waiting for the game to start.</h3>
        <br />
        <div className="beach-ball" />
        <NumberPlayers gameId={gameId} />
      </>
    );
  }
}

export default GamePending;
