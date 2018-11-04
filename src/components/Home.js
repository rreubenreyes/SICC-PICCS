import React, { Component } from "react";
import Join from "./Join";
import Create from "./Create";

export default class Home extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    console.log("hello");
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <Create history={history} />
        <Join history={history} />
      </div>
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
