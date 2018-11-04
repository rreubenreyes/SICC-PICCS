import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

class PlayGame extends Component {
  render() {
    const { userId, gameId } = this.props
    const GAMES_SUBSCRIPTION = gql`
      subscription GamesSubscription {
        games(where: { status: { _eq: "inProgress" }, id: {_eq: "${gameId}"} }) {
          id
          createdBy
          status
        }
      }
    `
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION}>
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
