import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import uuidv4 from 'uuid/v4'

class Create extends Component {
  constructor() {
    super()
    this.state = {
      gameId: null
    }
  }
  componentDidMount() {
    const gameId = uuidv4()
    this.setState({ gameId })
  }
  render() {
    const { gameId } = this.state
    const { userId } = this.props

    /*
    *  Creates a user and a game. The game is createdBy the user,
    *  and the game id is stored in the user row as gameId.
    *  The game status is initially set to "pending".
    */

    const CREATE_GAME = gql`
      mutation {
        insert_games(objects: [
          {
            id: "${gameId}",
            status: "pending",
            createdBy: "${userId}"
          }
        ]) {
          affected_rows
          returning {
            id
          }
        }
      }
    `
    const UPDATE_USER = gql`
mutation {
      update_users(
        where: { id: {_eq: "${userId}"} },
        _set: { gameId: "${gameId}" }
      ) {
          affected_rows
      }
  }
`
    const { history } = this.props
    return (
      <Mutation mutation={UPDATE_USER}>
        {updateUser => (
          <Mutation mutation={CREATE_GAME}>
            {createGame => (
              <button
                className="button--home__create"
                onClick={() => {
                  createGame()
                  updateUser()
                  history.push('/lobby', {
                    createdByUser: true,
                    userId,
                    gameId
                  })
                }}>
                Create a game
              </button>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default Create
