import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

import GameStarted from './GameStarted'
import GameNotStarted from './GameNotStarted'

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription($gameId: String!) {
    games(where: { status: { _eq: "inProgress" }, id: { _eq: $gameId } }) {
      id
      createdBy
      status
    }
  }
`

class PlayGame extends Component {
  render() {
    const { userId, gameId } = this.props
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {}, error, loading }) => {
          console.log({ data, error, loading })
          const { games = [] } = data
          if (games.length === 1) {
            return <GameStarted />
          } else if (games[0].status === 'pending') {
            return <GameNotStarted />
          } else if (games[0].status === 'finished') {
            if (games[0].winner === userId) {
              return <h3>The game has finished! You won!</h3>
            }
          }
        }}
      </Subscription>
    )
  }
}

export default PlayGame
