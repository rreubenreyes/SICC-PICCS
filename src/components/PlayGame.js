import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

import Chat from './Chat'
import GameInProgress from './GameInProgress'
import GamePending from './GamePending'
import GameFinished from './GameFinished'
import FlexWrapper from '../components/FlexWrapper'

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription($gameId: String!) {
    games(where: { id: { _eq: $gameId } }) {
      id
      createdBy
      status
      game_data_id
      messages {
        id
        message
        sent
        sentBy {
          id
          username
        }
      }
      winner
    }
  }
`

class PlayGame extends Component {
  getGameState = ({ games = [] }) => {
    const { userId, gameId, createdByUser } = this.props
    if (games.length === 1) {
      if (games[0].status === 'pending') {
        return (
          <GamePending
            userId={userId}
            gameId={gameId}
            gameDataId={games[0].game_data_id}
            createdByUser={createdByUser}
          />
        )
      }
      if (games[0].status === 'inProgress') {
        return (
          <GameInProgress
            userId={userId}
            gameId={gameId}
            gameDataId={games[0].game_data_id}
          />
        )
      }
      if (games[0].status === 'finished') {
        return (
          <GameFinished
            userId={userId}
            gameId={gameId}
            gameDataId={games[0].game_data_id}
            winner={games[0].winner}
          />
        )
      }
    }
  }
  render() {
    const {
      userId,
      gameId,
      createdByUser,
      isRandomGame,
      privateKey
    } = this.props
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {} }) => {
          const { games = [] } = data
          if (games.length === 1) {
            const currentGame = games[0]
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
              )
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
              )
            }
            if (currentGame.status === 'finished') {
              return (
                <FlexWrapper>
                  {() => (
                    <GameFinished
                      userId={userId}
                      gameId={gameId}
                      gameDataId={currentGame.game_data_id}
                      winner={currentGame.winner}
                    />
                  )}
                </FlexWrapper>
              )
            }
          }

          const { games } = data
          const { messages } = games[0]
          return (
            <FlexWrapper>
              {() => (
                <>
                  <Chat messages={messages} gameId={gameId} userId={userId} />
                  {this.getGameState(data)}
                </>
              )}
            </FlexWrapper>
          )
        }}
      </Subscription>
    )
  }
}

export default PlayGame
