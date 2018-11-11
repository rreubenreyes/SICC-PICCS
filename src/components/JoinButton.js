import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

class JoinButton extends Component {
  constructor() {
    super();
    this.state = {
      privateKeyValue: "",
      formSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ privateKeyValue: event.target.value });
  }
  handleSubmit() {
    this.setState({ formSubmitted: true });
  }
  render() {
    const { formSubmitted, privateKeyValue } = this.state;
    const {
      joinClass,
      history,
      games,
      isRandomGame,
      gameAvailable,
      userId
    } = this.props;
    if (gameAvailable) {
      if (isRandomGame) {
        const randomGameId = getRandomGameId(games);
        // Create a user and assign them to a random game
        const UPDATE_USER = gql`
        mutation {
            update_users(
                where: { id: {_eq: "${userId}"} },
                _set: { gameId: "${randomGameId}" }
            )
        }
        `;
        return (
          <Mutation mutation={UPDATE_USER}>
            {updateUser => {
              return (
                <button
                  className={`button--home__join ${joinClass} `}
                  onClick={e => {
                    updateUser();
                    history.push("/lobby", {
                      createdByUser: false,
                      userId,
                      gameId: randomGameId
                    });
                  }}
                >
                  Join a random game
                </button>
              );
            }}
          </Mutation>
        );
      }

      const GET_PRIVATE_GAME = gql`
        query GetPrivateGame($privateKey: String!) {
          games(
            where: {
              privateKey: { _eq: $privateKey }
              status: { _eq: "pending" }
            }
          ) {
            id
            createdBy
            status
            game_data_id
            winner
          }
        }
      `;
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
      return (
        <React.Fragment>
          <input
            type="text"
            name="privateKey"
            id="privateKey"
            value={this.state.privateKeyValue}
            onChange={this.handleChange.bind(this)}
          />
          <button
            className={`button--home__join ${joinClass} `}
            onClick={this.handleSubmit.bind(this)}
          >
            Join a private game
          </button>
          {formSubmitted && (
            <Query
              query={GET_PRIVATE_GAME}
              variables={{ privateKey: privateKeyValue }}
            >
              {(privateGames = {}) => {
                return (
                  <Mutation mutation={UPDATE_USER}>
                    {(updateUser, user = {}) => {
                      if (privateGames.data && privateGames.data.games) {
                        if (user.data) {
                          history.push("/lobby", {
                            createdByUser: false,
                            userId,
                            gameId: privateGames.data.games[0].id,
                            privateKey: privateKeyValue
                          });
                        }
                        if (!user.loading) {
                          updateUser({
                            variables: {
                              privateGameId: privateGames.data.games[0].id
                            }
                          });
                        }
                      }
                      return null;
                    }}
                  </Mutation>
                );
              }}
            </Query>
          )}
        </React.Fragment>
      );
    }
    const text = isRandomGame
      ? "No random games available to join"
      : "No private games available to join";
    return <button className={joinClass}>{text}</button>;
  }
}

function getRandomGameId(data) {
  const index = Math.floor(Math.random() * data.length);
  return data[index].id;
}

export default JoinButton;
