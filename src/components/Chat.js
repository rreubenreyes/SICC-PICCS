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
      message: '',
      timezoneOffset: new Date().getTimezoneOffset() / 60
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
    const { gameId, messages } = this.props
    const { message, timezoneOffset } = this.state
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
            <div
              style={{
                height: '40vh',
                width: '100%',
                border: '1px solid black'
              }}>
              {messages.map(m => {
                const rawTimestamp = m.sent.split(':')
                rawTimestamp[0] = parseInt(rawTimestamp[0])
                const timestamp = [
                  (rawTimestamp[0] - timezoneOffset + 24) % 12,
                  rawTimestamp[1]
                ].join(':')

                return (
                  <span key={m.id}>
                    {`${timestamp}: ${m.message}`}
                    <br />
                  </span>
                )
              })}
            </div>
            <label htmlFor="chat">Chat</label>
            <input
              name="chat"
              type="text"
              value={message}
              style={{
                border: '1px solid black'
              }}
              onChange={e => this.handleChange(e)}
            />
            <button
              type="submit"
              value="Send"
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
