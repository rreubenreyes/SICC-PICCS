import React, { Component } from "react";

class Challenge extends Component {
  render() {
    const { display } = this.props;
    return <p>{`Your challenge is to take a picture of ${display}`}</p>;
  }
}

export default Challenge;
