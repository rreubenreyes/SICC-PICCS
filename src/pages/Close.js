import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class Close extends Component {
  render() {
    const { history } = this.props;
    const CLOSE_ALL_GAMES = gql`
      mutation update_games {
        update_games(
          where: {
            _or: [
              { status: { _eq: "pending" } }
              { status: { _eq: "inProgress" } }
            ]
          }
          _set: { status: "finished" }
        ) {
          affected_rows
        }
      }
    `;
    return (
      <Mutation mutation={CLOSE_ALL_GAMES}>
        {(closeGames, { loading }) => {
          closeGames();
          history.push("/");
          return null;
        }}
      </Mutation>
    );
  }
}

export default Close;
