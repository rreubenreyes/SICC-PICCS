import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import uuidv4 from "uuid/v4";

class JoinButton extends Component {
  constructor() {
    super();
    this.state = {
      privateKeyValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ privateKeyValue: event.target.value });
  }
  render() {
    const userId = uuidv4();
    const {
      joinClass,
      history,
      games,
      value,
      isRandomGame,
      gameAvailable
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
                  {value}
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
            )
        }
        `;
      return (
        <Query query={GET_PRIVATE_GAME}>
          {(getPrivateGame, privateGames) => (
            <Mutation mutation={UPDATE_USER}>
              {(updateUser, user) => (
                <React.Fragment>
                  <input
                    type="text"
                    name="privateKey"
                    id="privateKey"
                    value={this.state.privateKeyValue}
                    onChange={this.handleChange}
                  />
                  <button
                    className={`button--home__join ${joinClass} `}
                    onClick={e => {
                      getPrivateGame({
                        variables: { privateKey: this.state.privateKeyValue }
                      });
                      updateUser({
                        variables: { gameId: privateGames.data[0].id }
                      });
                      history.push("/lobby", {
                        createdByUser: false,
                        userId,
                        gameId: user.data[0].gameId
                      });
                    }}
                  >
                    {value}
                  </button>
                </React.Fragment>
              )}
            </Mutation>
          )}
        </Query>
      );
    }
    return <button className={joinClass}>{value}</button>;
  }
}

function getRandomGameId(data) {
  const index = Math.floor(Math.random() * data.length);
  return data[index].id;
}

export default JoinButton;
