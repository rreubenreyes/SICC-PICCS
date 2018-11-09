import React, { Component } from "react";
import gql from "graphql-tag";
import JoinButton from "./JoinButton";
import { Subscription } from "react-apollo";

const GAMES_SUBSCRIPTION = gql`
  subscription {
    games(where: { status: { _eq: "pending" } }) {
      id
      createdBy
      status
    }
  }
`;

export default class Join extends Component {
  render() {
    const { history, randomGame } = this.props;
    const eq_neq = randomGame ? "_eq" : "_neq";

    const GAMES_SUBSCRIPTION = gql`
      subscription {
        games(
          where: { status: { _eq: "pending" }, privateKey: { ${eq_neq}: null } }
        ) {
          id
          createdBy
          status
          privateKey
        }
      }
    `;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION}>
        {({ data = {}, error, loading }) => {
          let gameAvailable = true;
          const { games = [] } = data;
          if (loading || error || games.length === 0) {
            gameAvailable = false;
          }
          if (error) {
            console.log(error);
          }
          return (
            <JoinButton
              history={history}
              games={games}
              gameAvailable={gameAvailable}
              randomGame={randomGame}
            />
          );
        }}
      </Subscription>
    );
  }
}
