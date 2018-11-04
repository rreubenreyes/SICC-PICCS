import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import GameInProgress from "./GameInProgress";
import GameNotStarted from "./GameNotStarted";
import GameFinished from "./GameFinished";

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription($gameId: String!) {
    games(where: { id: { _eq: $gameId } }) {
      id
      createdBy
      status
      game_data_id
    }
  }
`;

class PlayGame extends Component {
  render() {
    const { userId, gameId } = this.props;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {}, error, loading }) => {
          console.log({ data, error, loading });
          const { games = [] } = data;
          if (games.length === 1) {
            if (games[0].status === "pending") {
              return (
                <GameNotStarted
                  userId={userId}
                  gameId={gameId}
                  gameDataId={games[0].game_data_id}
                />
              );
            }
            if (games[0].status === "inProgress") {
              return (
                <GameInProgress
                  userId={userId}
                  gameId={gameId}
                  gameDataId={games[0].game_data_id}
                />
              );
            }
            if (games[0].status === "finished") {
              return (
                <GameFinished
                  userId={userId}
                  gameId={gameId}
                  gameDataId={games[0].game_data_id}
                />
              );
            }
          }
          return null;
        }}
      </Subscription>
    );
  }
}

export default PlayGame;
