import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class GameFinished extends Component {
  constructor() {
    super();
    this.state = {
      shouldGoToHome: false
    };
  }
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ shouldGoToHome: true });
      }.bind(this),
      3000
    );
  }
  render() {
    const { winner = false, userId, history } = this.props;
    console.log({ winner, userId });
    if (this.state.shouldGoToHome) {
      history.push("/");
    }
    if (winner === userId) {
      return <h3>Holy Cow you WON!</h3>;
    }
    if (winner) {
      return <h3>Holy Cow you LOST!</h3>;
    }
    return null;
  }
}

export default withRouter(GameFinished);
