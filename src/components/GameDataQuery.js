import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

class GameDataQuery extends Component {
  render() {
    const GAME_DATA_QUERY = gql`
      query {
        game_data {
          id
        }
      }
    `;

    return (
      <Query query={GAME_DATA_QUERY}>
        {({ loading, error, data = {} }) => {
          const { game_data = [] } = data;
          if (game_data.length > 0) {
            const randomGameDataId = getRandomGameDataId(game_data);
            return this.props.children(randomGameDataId);
          }
          return null;
        }}
      </Query>
    );
  }
}

export default GameDataQuery;

function getRandomGameDataId(game_data) {
  const index = Math.floor(Math.random() * game_data.length);
  return game_data[index].id;
}
