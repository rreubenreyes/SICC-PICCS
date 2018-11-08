import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import GameInProgress from "./GameInProgress";
import GamePending from "./GamePending";
import GameFinished from "./GameFinished";
import FlexWrapper from "../components/FlexWrapper";

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
          const { games = [] } = data;
          if (games.length === 1) {
            if (games[0].status === "pending") {
              return (
                <FlexWrapper>
                  {() => (
                    <GamePending
                      userId={userId}
                      gameId={gameId}
                      gameDataId={games[0].game_data_id}
                      createdByUser={createdByUser}
                    />
                  )}
                </FlexWrapper>
              );
            }
            if (games[0].status === "inProgress") {
              return (
                <FlexWrapper>
                  {() => (
                    <GameInProgress
                      userId={userId}
                      gameId={gameId}
                      gameDataId={games[0].game_data_id}
                    />
                  )}
                </FlexWrapper>
              );
            }
            if (games[0].status === "finished") {
              return (
                <FlexWrapper>
                  {() => (
                    <GameFinished
                      userId={userId}
                      gameId={gameId}
                      gameDataId={games[0].game_data_id}
                      winner={games[0].winner}
                    />
                  )}
                </FlexWrapper>
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
