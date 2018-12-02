import React, { Component } from 'react';
import NumberPlayers from './NumberPlayers';
import GameDataQuery from './GameDataQuery';
import Start from './Start';
import PrivateKeyModal from './PrivateKeyModal';

class GamePending extends Component {
  state = {
    showPrivateKeyModal: false,
  };
  handleShowModal = shouldShow => {
    this.setState({
      showPrivateKeyModal: shouldShow,
    });
  };
  render() {
    const {
      gameId,
      createdByUser,
      userId,
      privateKey,
      isRandomGame,
    } = this.props;
    const { showPrivateKeyModal } = this.state;
    return (
      <>
        <div className="game--info">
          <div className="game--status">
            {isRandomGame ? 'Game Lobby' : 'Private Game'}
          </div>
          <NumberPlayers gameId={gameId} />
        </div>
        <div className="game--room-actions">
          {privateKey && (
            <>
              <button
                className="button--small room-actions--invite button--info"
                onClick={() => this.handleShowModal(true)}
              >
                Invite code
              </button>
              <PrivateKeyModal
                show={showPrivateKeyModal}
                toggle={this.handleShowModal}
                privateKey={privateKey}
              />
            </>
          )}
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
      </>
    );
  }
}

export default GamePending;
