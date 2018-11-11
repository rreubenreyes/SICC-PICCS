import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class JoinButton extends Component {
  render() {
    const { history, games, gameAvailable, userId } = this.props;
    let { joinClass } = this.props;
    if (gameAvailable) {
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
              <div>
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
              </div>
            );
          }}
        </Mutation>
      );
    }
    return (
      <button className="disabled">No random games available to join</button>
    );
  }
}

function getRandomGameId(data) {
  const index = Math.floor(Math.random() * data.length);
  return data[index].id;
}

export default JoinButton;
