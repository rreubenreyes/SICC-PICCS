import React, { Component } from "react";
import Start from "../components/Start";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import PlayGame from "../components/PlayGame";

class Game extends Component {
  render() {
    const {
      location: {
        state: { createdByUser, userId, gameId = null }
      }
    } = this.props;
    if (createdByUser) {
      return <Start userId={userId} gameId={gameId} />;
    }

    const GAMES_SUBSCRIPTION = gql`
      subscription GamesSubscription {
        games(where: { status: { _eq: "inProgress" }, id: {_eq: "${gameId}"} }) {
          id
          createdBy
          status
        }
      }
    `;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION}>
        {({ data = {}, error, loading }) => {
          console.log({ data, error, loading });
          const { games = [] } = data;
          if (games.length === 1) {
            return <PlayGame userId={userId} gameId={gameId} />;
          }
          return null;
        }}
      </Subscription>
    );
  }
}

export default Game;
