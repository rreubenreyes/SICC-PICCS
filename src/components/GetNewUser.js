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
    const userId = uuidv4();
    this.setState({ userId });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    const { value, userId } = this.state;
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
    return (
      <Mutation mutation={CREATE_USER}>
        {createUser => (
          <form
            action=""
            onSubmit={e => {
              e.preventDefault();
              createUser();
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
    );
  }
}

export default GetNewUser;
