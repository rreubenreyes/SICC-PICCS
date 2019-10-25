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
  /**
   * TODO: refactor from PureComponent
   * PureComponent fixes the chat updating on fixed intervals
   * however it still wants to update on internal state change
   * we need to make it so that it only updates when the GraphQL
   * subscription receives a new message. the subscription is
   * external to this component, and belongs to PlayGame.
   */
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
    this.chatMessages = React.createRef();
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
    const chat = this.chatMessages.current;
    chat.scrollTop = chat.scrollHeight;
  };

  componentDidUpdate = () => {
    const chat = this.chatMessages.current;
    chat.scrollTop = chat.scrollHeight;
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
        {updateMessages => {
          return (
            <div className="game--chat">
              <div className="chat--messages" ref={this.chatMessages}>
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
                      <span
                        style={{ color: '#999' }}
                      >{`(${timestamp}${amOrPm}) `}</span>
                      <strong>{`${username}: `}</strong>
                      {`${m.message}`}
                      <br />
                    </span>
                  );
                })}
              </div>
              <form
                className="chat--form"
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit();
                  updateMessages();
                }}
              >
                <input
                  name="chat--input"
                  type="text"
                  placeholder="Enter your message... "
                  value={message}
                  onChange={e => this.handleChange(e)}
                />
                <button
                  className="button--small inline"
                  type="submit"
                  value="Send"
                >
                  Send
                </button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
