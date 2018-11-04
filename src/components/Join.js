import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import uuidv4 from 'uuid/v4'
const gameId = uuidv4()
const userId = uuidv4()

const JOIN_GAME = gql`
  mutation {
    insert_users(objects: [
        {
            id: "${userId}",
            game: { 
                data: { 
                    status: "pending",
                    id: "${gameId}",
                    createdBy: "${userId}"
                }
            }
        }
    ]) {
      affected_rows
      returning {
        id
        game {
          id
        }
      }
    }
  }
`

export default class Join extends Component {
  render() {
    return (
      <Mutation mutation={JOIN_GAME}>
        {createGame => <button onClick={createGame}>Join</button>}
      </Mutation>
    )
  }
}
