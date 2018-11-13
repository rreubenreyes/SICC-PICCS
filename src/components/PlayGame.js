import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

import Chat from './Chat';
import GameInProgress from './GameInProgress';
import GamePending from './GamePending';
import GameFinished from './GameFinished';
import FlexWrapper from '../components/FlexWrapper';

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription($gameId: String!) {
    games(where: { id: { _eq: $gameId } }) {
      id
      createdBy
      status
      game_data_id
      messages(order_by: { sent: asc }) {
        id
        message
        sent
        sentBy {
          id
          username
        }
      }
      winnerRel {
        username
        id
      }
    }
  }
`;

class PlayGame extends Component {
  getGameState = ({ games = [] }) => {
    const {
      userId,
      gameId,
      createdByUser,
      isRandomGame,
      privateKey,
    } = this.props;
    if (games.length === 1) {
      const [currentGame] = games;
      if (currentGame.status === 'pending') {
        return (
          <GamePending
            userId={userId}
            gameId={gameId}
            gameDataId={currentGame.game_data_id}
            createdByUser={createdByUser}
            isRandomGame={isRandomGame}
            privateKey={privateKey}
          />
        );
      }
      if (currentGame.status === 'inProgress') {
        return (
          <FlexWrapper>
            {() => (
              <GameInProgress
                userId={userId}
                gameId={gameId}
                gameDataId={currentGame.game_data_id}
              />
            )}
          </FlexWrapper>
        );
      }
      if (currentGame.status === 'finished') {
        return (
          <GameFinished
            userId={userId}
            gameId={gameId}
            gameDataId={currentGame.game_data_id}
            winnerRel={currentGame.winnerRel}
          />
        );
      }
    }
  };
  render() {
    const { userId, gameId } = this.props;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {} }) => {
          const { games = [] } = data;
          const { messages } = games[0] || { messages: [] };
          return (
            <FlexWrapper>
              {() => (
                <>
                  {this.getGameState(data)}
                  <Chat messages={messages} gameId={gameId} userId={userId} />
                </>
              )}
            </FlexWrapper>
          );
        }}
      </Subscription>
    );
  }
}

export default PlayGame;
