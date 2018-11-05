import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import uuidv4 from 'uuid/v4'

class JoinButton extends Component {
  render() {
    const userId = uuidv4()
    const { joinClass, history, games, value } = this.props
    if (games.length > 0) {
      const randomGameId = getRandomGameId(games)
      const CREATE_USER = gql`
        mutation {
            insert_users(objects: [
                {
                    id: "${userId}",
                    gameId: "${randomGameId}"
                }
            ]) {
            affected_rows
            returning {
                id
            }
            }
        }
        `
      return (
        <Mutation mutation={CREATE_USER}>
          {createUser => {
            return (
              <button
                className={`button--home__join ${joinClass} `}
                onClick={e => {
                  createUser()
                  history.push('/lobby', {
                    createdByUser: false,
                    userId,
                    gameId: randomGameId
                  })
                }}>
                {value}
              </button>
            )
          }}
        </Mutation>
      )
    }
    return <button className={joinClass}>{value}</button>
  }
}

function getRandomGameId(data) {
  const index = Math.floor(Math.random() * data.length)
  return data[index].id
}

export default JoinButton
