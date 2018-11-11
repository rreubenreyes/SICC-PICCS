import React, { Component } from "react";
import JoinContainer from "../components/JoinContainer";

class Join extends Component {
  render() {
    const {
      history,
      location: {
        state: { user }
      }
    } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <JoinContainer
          history={history}
          isRandomGame={true}
          userId={user.userId}
        />
        <JoinContainer
          history={history}
          isRandomGame={false}
          userId={user.userId}
        />
      </div>
    );
  }
}

export default Join;
