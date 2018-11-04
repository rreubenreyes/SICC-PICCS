import React, { Component } from "react";
import gql from "graphql-tag";

import { Mutation } from "react-apollo";
import PlayGame from "./PlayGame";

class Start extends Component {
  constructor() {
    super();
    this.state = { started: false };
  }
  render() {
    const { userId, gameId } = this.props;
    const START_GAME = gql`
        mutation update_games {
            update_games(
                where: { createdBy: { _eq: "${userId}", id: {_eq: "${gameId}"} } },
                _set: { status: "inProgress" }
            ) {
                affected_rows
            }
        }
      `;
    if (!this.state.started) {
      return (
        <Mutation mutation={START_GAME}>
          {startGame => {
            return (
              <button
                onClick={() => {
                  startGame();
                  this.setState({ started: true });
                }}
              >
                Start Game
              </button>
            );
          }}
        </Mutation>
      );
    }
    return <PlayGame userId={userId} gameId={gameId} />;
  }
}

export default Start;
