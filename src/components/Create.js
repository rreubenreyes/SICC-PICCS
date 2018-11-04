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

class Create extends Component {
  render() {
    const { history } = this.props;
    return (
      <Mutation mutation={CREATE_GAME}>
        {createGame => (
          <button
            onClick={() => {
              createGame();
              history.push("/lobby");
            }}
          >
            Create
          </button>
        )}
      </Mutation>
    );
  }
}

export default Create;
