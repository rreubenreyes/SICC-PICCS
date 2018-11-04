import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import uuidv4 from "uuid/v4";
const gameId = uuidv4();
const userId = uuidv4();

const CREATE_GAME = gql`
  mutation {
    insert_users(objects: [
        {
            id: "${userId}",
            game: { 
                data: { 
                    status: "pending",
                    id: "${gameId}"
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

class Create extends Component {
  render() {
    return (
      <Mutation mutation={CREATE_GAME}>
        {createGame => <button onClick={createGame}>Create</button>}
      </Mutation>
    );
  }
}

export default Create;
