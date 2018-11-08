import React, { Component } from "react";
import gql from "graphql-tag";
import JoinButton from "./JoinButton";
import { Subscription } from "react-apollo";

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription {
    games(where: { status: { _eq: "pending" } }) {
      id
      createdBy
      status
    }
  }
`;

export default class Join extends Component {
  render() {
    const { history } = this.props;
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION}>
        {({ data = {}, error, loading }) => {
          let joinClass = "enabled";
          let value = "Join a random game";
          const { games = [] } = data;
          // Only allow user to join a game if there is one available
          if (loading || error || games.length === 0) {
            joinClass = "disabled";
            value = "No games available";
          }
          if (error) {
            console.log(error);
          }
          return (
            <JoinButton
              history={history}
              games={games}
              joinClass={joinClass}
              value={value}
            />
          );
        }}
      </Subscription>
    );
  }
}
