import React, { Component } from "react";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";

import Join from "./Join";
import Lobby from "./Lobby";
import Create from "./Create";

const GAMES_SUBSCRIPTION = gql`
  subscription GamesSubscription {
    games(where: { status: { _eq: "pending" } }) {
      id
      createdBy
      status
    }
  }
`;

export default class Home extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    console.log("hello");
  };

  render() {
    return (
      <Subscription subscription={GAMES_SUBSCRIPTION}>
        {({ data, error, loading }) => {
          if (loading) {
            return null;
          }
          if (error) {
            console.log(error);
            return "Error loading games";
          }
          return (
            <div>
              <p>Games ({!data.games ? 0 : data.games.length})</p>
              <ul>
                {data.games &&
                  data.games.map(g => {
                    return (
                      <li key={g.id}>
                        <ul>
                          <li>
                            <strong>ID:</strong> {g.id}
                          </li>

                          <li>
                            <strong>created by:</strong> {g.createdBy}
                          </li>
                        </ul>
                        <br />
                      </li>
                    );
                  })}
              </ul>
              <Create />
            </div>
          );
        }}
      </Subscription>
      // <Query query={GAMES_QUERY}>
      //   {({ subscribeToMore, ...result }) => {
      //     return (
      //       <Lobby
      //         {...result}
      //         subscribeToNewGames={() => {
      //           subscribeToMore({
      //             document: GAMES_SUBSCRIPTION,
      //             updateQuery: (prev, { subscriptionData: { data } }) => {
      //               if (!data) return prev
      //               const newFeedItem = data.games

      //               return { ...prev, games: [...prev.games, newFeedItem] }
      //             }
      //           })
      //         }}
      //       />
      //     )
      //   }}
      // </Query>
    );
  }
}
