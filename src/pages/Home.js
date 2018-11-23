import React, { Component } from 'react';
import GetNewUser from '../components/GetNewUser';
import FlexWrapper from '../components/FlexWrapper';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    // Get user info from local storage if it exists
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.setState({ user });
    }
  }
  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <FlexWrapper>
        {user.userId && user.username && (
          <div>
            <p style={{ textAlign: 'center', marginBottom: '0px' }}>{`Hello, ${
              user.username
            }!`}</p>
            <button
              onClick={() =>
                this.setState({
                  user: { userId: user.userId, username: null },
                })
              }
            >
              Edit Name
            </button>
          </div>
        )}
        {!user.username && !user.userId && (
          <React.Fragment>
            <p
              style={{
                padding: '0 1rem',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Blazing-fast, machine-learning, real-time online scavenger hunt
            </p>
            <p
              style={{
                padding: '0 1rem',
                textAlign: 'center',
              }}
            >
              Play in a private game with your friends or a random game with
              random strangers across the world!
            </p>
          </React.Fragment>
        )}
        {user.userId && user.username ? (
          <div style={{ textAlign: 'center' }}>
            <Link
              style={{ display: 'block' }}
              to={{ pathname: '/create', state: { user } }}
            >
              Create a game
            </Link>
            <Link
              style={{ display: 'block' }}
              to={{ pathname: '/join', state: { user } }}
            >
              Join a game
            </Link>
          </div>
        ) : (
          <GetNewUser updateUser={this.updateUser.bind(this)} user={user} />
        )}
      </FlexWrapper>
    );
  }
}
