import React, { Component } from 'react';
import gql from 'graphql-tag';

import { Mutation } from 'react-apollo';

class Start extends Component {
  render() {
    const { userId, gameId, gameDataId } = this.props;

    const START_GAME = gql`
        mutation update_games {
            update_games(
                where: { createdBy: { _eq: "${userId}"}, id: {_eq: "${gameId}"}, status: {_eq: "pending"} },
                _set: { status: "inProgress", game_data_id: "${gameDataId}" }
            ) {
                affected_rows
            }
        }
      `;
    return (
      <Mutation mutation={START_GAME}>
        {(startGame, { loading, data }) => {
          if (loading || data) {
            return <button className="disabled">Loading...</button>;
          }
          return <button onClick={startGame}>Start Game</button>;
        }}
      </Mutation>
    );
  }
}

export default Start;
