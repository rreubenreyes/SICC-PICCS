import React, { Component } from 'react';
import NumberPlayers from './NumberPlayers';
import GameDataQuery from './GameDataQuery';
import Start from './Start';

class GamePending extends Component {
  render() {
    const { gameId, createdByUser, userId, privateKey } = this.props;

    return (
      <>
        <div className="game--info">
          <div className="game--status">Game Lobby</div>
          <NumberPlayers gameId={gameId} />
        </div>
        <div className="game--start">
          {createdByUser ? (
            <GameDataQuery>
              {gameDataId => (
                <Start
                  userId={userId}
                  gameId={gameId}
                  gameDataId={gameDataId}
                />
              )}
            </GameDataQuery>
          ) : (
            <button className="button--small disabled">Waiting...</button>
          )}
        </div>
        {privateKey && (
          <React.Fragment>
            <h3>{`Share the code below with your friends!`}</h3>
            <h1>{`${privateKey}`}</h1>
          </React.Fragment>
        )}
      </>
    );
  }
}

export default GamePending;
