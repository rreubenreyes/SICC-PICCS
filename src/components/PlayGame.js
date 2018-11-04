import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription($gameId: String!) {
    games(where: { id: { _eq: $gameId } }) {
      id
      createdBy
      status
    }
  }
`;

class PlayGame extends Component {
  render() {
    const { gameId, userId } = this.props;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {}, error, loading }) => {
          console.log({ data, error, loading });
          const { games = [] } = data;
          if (games.length === 1) {
            if (games[0].status === "inProgress") {
              return <h3>You are playing the game!</h3>;
            }
            if (games[0].status === "pending") {
              return <h3>You are waiting for the game to start</h3>;
            }
            if (games[0].status === "finished") {
              if (games[0].winner === userId) {
                return <h3>The game has finished! You won!</h3>;
              }
              return <h3>The game has finished! You lost!</h3>;
            }
          }
        }}
      </Subscription>
    );
  }
}

export default PlayGame;
