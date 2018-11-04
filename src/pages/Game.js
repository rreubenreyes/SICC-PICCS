import React, { Component } from 'react'
import Start from '../components/Start'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import PlayGame from '../components/PlayGame'

class Game extends Component {
  render() {
    const {
      location: {
        state: { createdByUser, userId, gameId = null }
      }
    } = this.props
    console.log({ userId, gameId })
    if (createdByUser) {
      return <Start userId={userId} gameId={gameId} />
    }

    return <PlayGame userId={userId} gameId={gameId} />
  }
}

export default Game
