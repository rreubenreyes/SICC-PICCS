import React, { Component } from 'react'
import PlayGame from '../components/PlayGame'

class Game extends Component {
  render() {
    const {
      location: {
        state: { createdByUser, userId, gameId = null }
      }
    } = this.props

    return (
      <PlayGame userId={userId} gameId={gameId} createdByUser={createdByUser} />
    )
  }
}

export default Game
