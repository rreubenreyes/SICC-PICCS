import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

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
            return <h3>You are playing the game!</h3>
          }
          return <h3>You are waiting for the game to start</h3>
        }}
      </Subscription>
    )
  }
}

export default PlayGame
