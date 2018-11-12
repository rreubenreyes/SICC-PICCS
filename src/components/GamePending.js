import React, { Component } from 'react';
import NumberPlayers from './NumberPlayers';
import GameDataQuery from './GameDataQuery';
import Start from './Start';

class GamePending extends Component {
  render() {
    const { gameId, createdByUser, userId, privateKey } = this.props;

    return (
      <div style={{ textAlign: 'center' }}>
        {createdByUser && (
          <GameDataQuery>
            {gameDataId => (
              <Start userId={userId} gameId={gameId} gameDataId={gameDataId} />
            )}
          </GameDataQuery>
        )}
        <h3>
          {createdByUser
            ? 'Waiting for you to start the game.'
            : 'Waiting for the game to start.'}
        </h3>
        {privateKey && (
          <React.Fragment>
            <h3>{`Share the code below with your friends!`}</h3>
            <h1 style={{ fontSize: '56px' }}>{`${privateKey}`}</h1>
          </React.Fragment>
        )}
        <div className="beach-ball" />
        <NumberPlayers gameId={gameId} />
      </div>
    );
  }
}

export default GamePending;
