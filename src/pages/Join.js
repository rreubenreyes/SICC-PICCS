import React, { Component } from "react";
import JoinSubscription from "../components/JoinSubscription";

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
        <JoinSubscription
          history={history}
          isRandomGame={true}
          userId={user.userId}
        />
        <JoinSubscription
          history={history}
          isRandomGame={false}
          userId={user.userId}
        />
      </div>
    );
  }
}

export default Join;
