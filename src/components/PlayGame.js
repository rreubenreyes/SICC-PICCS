import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import GameInProgress from "./GameInProgress";
import GamePending from "./GamePending";
import GameFinished from "./GameFinished";

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription($gameId: String!) {
    games(where: { id: { _eq: $gameId } }) {
      id
      createdBy
      status
      game_data_id
      winner
    }
  }
`;

class PlayGame extends Component {
  render() {
    const { userId, gameId, createdByUser } = this.props;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION} variables={{ gameId }}>
        {({ data = {}, error, loading }) => {
          console.log({ data, error, loading });
          const { games = [] } = data;
          if (games.length === 1) {
            if (games[0].status === "pending") {
              return (
                <GamePending
                  userId={userId}
                  gameId={gameId}
                  gameDataId={games[0].game_data_id}
                  createdByUser={createdByUser}
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
              console.log(games[0]);
              return (
                <GameFinished
                  userId={userId}
                  gameId={gameId}
                  gameDataId={games[0].game_data_id}
                  winner={games[0].winner}
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
