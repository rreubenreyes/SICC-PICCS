import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class JoinButton extends Component {
  constructor() {
    super();
    this.state = {
      privateKeyValue: '',
      formSubmitted: false,
      privateGame: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const privateKeyValue = event.target.value;
    this.setState({ privateKeyValue });
    const { games } = this.props;
    const privateGame =
      games.find(game => game.privateKey === privateKeyValue) || null;
    this.setState({ privateGame });
  }
  handleSubmit() {
    this.setState({ formSubmitted: true });
  }
  render() {
    const { formSubmitted, privateKeyValue, privateGame } = this.state;
    const { history, gameAvailable, userId } = this.props;
    let { joinClass } = this.props;
    if (gameAvailable) {
      const UPDATE_USER = gql`
        mutation UpdateUser($privateGameId: String!) {
            update_users(
                where: { id: {_eq: "${userId}"} },
                _set: { gameId: $privateGameId }
            ) {
                affected_rows
            }
        }
        `;
      if (!privateGame) {
        joinClass = 'disabled';
      }
      return (
        <React.Fragment>
          <div>
            <label style={{ display: 'block' }} htmlFor="privateKey">
              Enter key to join private game:
              <input
                style={{ borderRadius: '2px', border: '1px solid gray' }}
                type="text"
                name="privateKey"
                id="privateKey"
                value={this.state.privateKeyValue}
                onChange={this.handleChange.bind(this)}
              />
            </label>
          </div>
          <div>
            <button
              className={`button--home__join ${joinClass} `}
              onClick={this.handleSubmit.bind(this)}
            >
              Join a private game
            </button>
          </div>
          {formSubmitted && (
            <Mutation mutation={UPDATE_USER}>
              {(updateUser, user = {}) => {
                if (user.data) {
                  history.push('/lobby', {
                    createdByUser: false,
                    userId,
                    gameId: privateGame.id,
                    privateKey: privateKeyValue,
                  });
                }
                if (!user.loading && privateGame) {
                  updateUser({
                    variables: {
                      privateGameId: privateGame.id,
                    },
                  });
                }
                return null;
              }}
            </Mutation>
          )}
        </React.Fragment>
      );
    }
    return (
      <button className="disabled">No private games available to join</button>
    );
  }
}

export default JoinButton;
