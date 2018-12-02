import React, { Component } from 'react';
import GetNewUser from '../components/GetNewUser';
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
      <div className="home">
        <div className="home--user-info">
          <div className="user-info">
            {user.userId && user.username && (
              <>
                <p>{`Hello, ${user.username}!`}</p>
                <button
                  className="button--small"
                  onClick={() =>
                    this.setState({
                      user: { userId: user.userId, username: null },
                    })
                  }
                >
                  Edit Name
                </button>
              </>
            )}
            {/* show intro text when user is not initialized
             * TODO: change this to a new route
             */}
            {!user.username && !user.userId && (
              <p>
                <span>
                  Blazing-fast, machine-learning, real-time online scavenger
                  hunt
                </span>
                <br />
                <span>
                  Play in a private game with your friends or a random game with
                  random strangers across the world!
                </span>
              </p>
            )}
          </div>
        </div>
        {user.userId && user.username ? (
          <div className="home--games">
            <Link to={{ pathname: '/create', state: { user } }}>
              <button className="button--full-width" type="button">
                Create a game
              </button>
            </Link>
            <Link to={{ pathname: '/join', state: { user } }}>
              <button className="button--full-width" type="button">
                Join a game
              </button>
            </Link>
          </div>
        ) : (
          <GetNewUser updateUser={this.updateUser.bind(this)} user={user} />
        )}
      </div>
    );
  }
}
