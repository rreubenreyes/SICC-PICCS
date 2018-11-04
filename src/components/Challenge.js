import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

class Challenge extends Component {
  render() {
    const { gameDataId } = this.props
    const GAME_DATA_QUERY = gql`
      query {
        game_data(where: {id: { _eq: ${gameDataId}}}) {
          keyword
        }
      }
    `

    return (
      <Query query={GAME_DATA_QUERY}>
        {({ loading, error, data = {} }) => {
          const { game_data = [] } = data
          if (game_data.length === 1) {
            return (
              <p>{`Your challenge is to take a picture of a ${
                game_data[0].keyword
              }`}</p>
            )
          }
          return null
        }}
      </Query>
    )
  }
}

export default Challenge
