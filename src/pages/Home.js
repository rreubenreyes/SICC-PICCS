import React, { Component } from "react";
import Join from "../components/Join";
import Create from "../components/Create";
import GetNewUser from "../components/GetNewUser";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      this.setState({ user });
    }
  }
  updateUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    const { history } = this.props;
    return (
      <div className="home">
        <p
          style={{
            padding: "0 1rem",
            textAlign: "center"
          }}
        >
          This app was developed in a small incubator inside Microsoft.
          <span role="img" aria-label="nonsense emojis">
            🥑 😉
          </span>
          <br />
          <sub>
            <em>#JAMstackHackathon2018</em>
          </sub>
        </p>
        {user.userId ? (
          <div>
            <p>{`Hello, ${user.username}`}</p>
            <Create history={history} userId={user.userId} />
            <Join history={history} userId={user.userId} />
          </div>
        ) : (
          <GetNewUser updateUser={this.updateUser} />
        )}
      </div>
    );
  }
}
