import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

class GetNewUser extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { user } = this.props;
    let username = user.username;
    let mode = "create";
    if (!username) {
      if (username === null) {
        mode = "edit";
      }
      username = "";
    }
    const userId = uuidv4();
    this.setState({ userId, value: username, mode });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    const { value, userId, mode } = this.state;
    const { updateUser } = this.props;
    const CREATE_USER = gql`
        mutation {
            insert_users(objects: [
                {
                    id: "${userId}",
                    username: "${value}"
                }
            ]) {
            affected_rows
            returning {
                id
            }
            }
        }
    `;
    const EDIT_USER = gql`
        mutation {
            update_users(
                where: { id: {_eq: "${userId}"} },
                _set: { username: "${value}" }
            ) {
            affected_rows
            returning {
                id
            }
            }
        }
        `;
    return (
      <Mutation mutation={EDIT_USER}>
        {editUser => (
          <Mutation mutation={CREATE_USER}>
            {createUser => (
              <form
                action=""
                onSubmit={e => {
                  e.preventDefault();
                  if (mode === "create") {
                    createUser();
                  }
                  if (mode === "edit") {
                    editUser();
                  }
                  updateUser({ userId, username: value });
                }}
              >
                <label htmlFor="username">Enter username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input type="submit" value="Save" />
              </form>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default GetNewUser;
