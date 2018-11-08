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
      winner
      messages {
        id
        message
      }
    }
  }
`

class PlayGame extends Component {
  state = {
    gameComponent: null
  }

  componentDidUpdate = (prevProps, prevState) => {}

  getGameState = ({ games = [] }) => {
    const { userId, gameId, createdBy } = this.props
    if (games.length === 1) {
      if (games[0].status === 'pending') {
        return (
          <FlexWrapper>
            {() => (
              <GamePending
                userId={userId}
                gameId={gameId}
                gameDataId={games[0].game_data_id}
                createdBy={createdBy}
              />
            )}
          </FlexWrapper>
        )
      }
      if (games[0].status === 'inProgress') {
        return (
          <FlexWrapper>
            {() => (
              <GameInProgress
                userId={userId}
                gameId={gameId}
                gameDataId={games[0].game_data_id}
              />
            )}
          </FlexWrapper>
        )
      }
      if (games[0].status === 'finished') {
        return (
          <FlexWrapper>
            {() => (
              <GameFinished
                userId={userId}
                gameId={gameId}
                gameDataId={games[0].game_data_id}
                winner={games[0].winner}
              />
            )}
          </FlexWrapper>
        )
      }
    }
    return null
  }

  render() {
    const { gameId } = this.props
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {}, error, loading }) => {
          if (loading) {
            return 'Loading...'
          }

          const { games } = data
          const {
            messages: { id: messageId }
          } = games[0]
          console.log(games)
          return (
            <>
              <Chat messageId={messageId} gameId={gameId} />
              {this.getGameState(data)}
            </>
          )
        }}
      </Subscription>
    )
  }
}

export default PlayGame
