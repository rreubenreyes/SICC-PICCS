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
    const { gameId } = this.props
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {}, error, loading }) => {
          console.log({ data, error, loading })
          const { games = [] } = data
          if (games.length === 1) {
            return <GameStarted />
          }
          return <GameNotStarted />
        }}
      </Subscription>
    )
  }
}

export default PlayGame
