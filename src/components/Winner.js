import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Winner extends Component {
  render() {
    const { userId, gameId } = this.props;
    const FINISH_GAME = gql`
      mutation
        update_games(
          where: {
            id: { _eq: "${gameId}" }
          }
          _set: { status: "finished", winner: "${userId}" }
        ) {
          affected_rows
        }
      }
    `;
    return (
      <Mutation mutation={FINISH_GAME}>
        {finishGame => {
          finishGame();
          return null;
        }}
      </Mutation>
    );
  }
}

export default Winner;
