import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import uuidv4 from "uuid/v4";

class Create extends Component {
  render() {
    const gameId = uuidv4();
    const userId = uuidv4();

    /*
    *  Creates a user and a game. The game is createdBy the user,
    *  and the game id is stored in the user row as gameId.
    *  The game status is initially set to "pending".
    */

    const CREATE_GAME = gql`
  mutation {
    insert_users(objects: [
        {
            id: "${userId}",
            game: { 
                data: { 
                    status: "pending",
                    id: "${gameId}",
                    createdBy: "${userId}"
                }
            }
        }
    ]) {
      affected_rows
      returning {
        id
        game {
          id
        }
      }
    }
  }
`;
    const { history } = this.props;
    return (
      <Mutation mutation={CREATE_GAME}>
        {createGame => (
          <button
            className="button--home__create"
            onClick={() => {
              createGame();
              history.push("/lobby", { createdByUser: true, userId, gameId });
            }}
          >
            Create a game
          </button>
        )}
      </Mutation>
    );
  }
}

export default Create;
