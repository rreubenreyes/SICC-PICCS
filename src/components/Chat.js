import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import uuidv4 from 'uuid/v4';

const INSERT_MESSAGES = gql`
  mutation InsertMessages(
    $messageId: String!
    $gameId: String!
    $message: String!
    $userId: String!
  ) {
    insert_messages(
      objects: [
        { id: $messageId, gameId: $gameId, userId: $userId, message: $message }
      ]
    ) {
      affected_rows
    }
  }
`;

export default class Chat extends PureComponent {
  static propTypes = {
    gameId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      timezoneOffset: new Date().getTimezoneOffset() / 60,
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value,
    });
  };

  handleSubmit = () => {
    this.setState({
      message: '',
    });
  };

  componentDidMount = () => {
    this.chatWindow = document.querySelector('#chat-window');
  };

  componentDidUpdate = () => {
    this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
  };

  render() {
    const { gameId, userId, messages } = this.props;
    const { message, timezoneOffset } = this.state;
    const messageId = uuidv4();

    return (
      <Mutation
        mutation={INSERT_MESSAGES}
        variables={{ messageId, gameId, userId, message }}
      >
        {(updateMessages, { data }) => {
          return (
            <>
              <div
                id="chat-window"
                style={{
                  height: '40vh',
                  width: '100%',
                  border: '1px solid black',
                  overflowY: 'scroll',
                }}
              >
                {messages.map(m => {
                  const {
                    sentBy: { username },
                  } = m;
                  const rawTimestamp = m.sent.split(':');
                  rawTimestamp[0] = parseInt(rawTimestamp[0]);
                  const [rawHours, rawMinutes] = [
                    rawTimestamp[0] - timezoneOffset + 24,
                    rawTimestamp[1],
                  ];
                  const amOrPm = rawHours < 12 ? 'AM' : 'PM';
                  const timestamp = [rawHours % 12 || 12, rawMinutes].join(':');
                  return (
                    <span key={m.id}>
                      {`(${timestamp}${amOrPm}) ${username}: ${m.message}`}
                      <br />
                    </span>
                  );
                })}
              </div>
              <label htmlFor="chat">Chat</label>
              <input
                name="chat"
                type="text"
                value={message}
                style={{
                  border: '1px solid black',
                }}
                onChange={e => this.handleChange(e)}
              />
              <button
                type="submit"
                value="Send"
                onClick={() => {
                  this.handleSubmit();
                  updateMessages();
                }}
              >
                Send
              </button>
            </>
          );
        }}
      </Mutation>
    );
  }
}
