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
    const { gameId, userId } = this.props
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data, error, loading }) => {
          if (loading) {
            return 'Loading...'
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
