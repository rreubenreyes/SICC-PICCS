import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class GetNewUser extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { user } = this.props;
    let username = user.username;
    let mode = 'create';
    if (!username) {
      if (username === null) {
        mode = 'edit';
      }
      username = '';
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <form
                  style={{ width: '85%', maxWidth: '500px' }}
                  action=""
                  onSubmit={e => {
                    e.preventDefault();
                    if (mode === 'create') {
                      createUser();
                    }
                    if (mode === 'edit') {
                      editUser();
                    }
                    updateUser({ userId, username: value });
                  }}
                >
                  <label
                    style={{ display: 'block', textAlign: 'left' }}
                    htmlFor="username"
                  >
                    Enter username:
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={this.state.value}
                      onChange={this.handleChange}
                      style={{
                        border: 'solid 1px gray',
                        borderRadius: '3px',
                        fontSize: '20px',
                        flex: '1 1 auto',
                        display: 'block',
                        minWidth: '0',
                        padding: '5px',
                      }}
                    />
                    <button style={{ flex: '0 0 20px' }} action="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default GetNewUser;
