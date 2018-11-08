import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import uuidv4 from 'uuid/v4'

export default class Chat extends Component {
  static propTypes = {
    gameId: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit = () => {
    this.setState({
      message: ''
    })
  }

  render() {
    const { gameId } = this.props
    const { message } = this.state
    const messageId = uuidv4()
    const UPDATE_MESSAGES = gql`
      mutation UpdateMessages{
        insert_messages(
          objects: [
            {
              id: "${messageId}",
              gameId: "${gameId}",
              message: "${message}"
            }
          ]
        ) {
          affected_rows
        }
      }
    `

    return (
      <Mutation mutation={UPDATE_MESSAGES}>
        {updateMessages => (
          <>
            <label htmlFor="chat">Chat</label>
            <input
              name="chat"
              type="text"
              value={message}
              onChange={e => this.handleChange(e)}
            />
            <button
              type="submit"
              value="Submit"
              onClick={() => {
                this.handleSubmit()
                updateMessages()
              }}>
              Send
            </button>
          </>
        )}
      </Mutation>
    )
  }
}
