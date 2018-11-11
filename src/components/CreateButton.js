import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import uuidv4 from 'uuid/v4'
import { getNewPrivateKey } from '../helpers/helpers'

class CreateContainer extends Component {
  constructor() {
    super()
    this.state = {
      gameId: null
    }
  }
  componentDidMount() {
    const gameId = uuidv4()
    const { isRandomGame } = this.props
    const privateKey = isRandomGame ? null : getNewPrivateKey()
    this.setState({ gameId, privateKey })
  }
  render() {
    const { gameId, privateKey } = this.state
    const { userId, isRandomGame, history } = this.props
    const text = isRandomGame ? 'Create a random game' : 'Create a private game'

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
            createdBy: "${userId}",
            privateKey: "${privateKey}"
          }
        ]) {
          affected_rows
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
                    isRandomGame,
                    privateKey,
                    userId,
                    gameId
                  })
                }}>
                {text}
              </button>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default CreateContainer
