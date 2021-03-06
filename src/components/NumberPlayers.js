import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

class NumberPlayers extends Component {
  render() {
    const { gameId } = this.props
    const NUMBER_PLAYERS_SUBSCRIPTION = gql`
        subscription {
          users(where: { gameId: { _eq: "${gameId}" } }) {
            id
          }

        }
      `
    return (
      <Subscription subscription={NUMBER_PLAYERS_SUBSCRIPTION}>
        {({ loading, data = {} }) => {
          const { users = [] } = data
          if (!loading) {
            let players = 'players'
            let are = 'are'
            if (users.length === 1) {
              players = 'player'
              are = 'is'
            }
            return (
              <h3>{`There ${are} ${users.length} ${players} in the game`}</h3>
            )
          }
          return null
        }}
      </Subscription>
    )
  }
}

export default NumberPlayers
