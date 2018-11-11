import React, { Component } from "react";
import CreateButton from "../components/CreateButton";

class Create extends Component {
  render() {
    const {
      history,
      location: {
        state: { user }
      }
    } = this.props;
    return (
      <div>
        <CreateButton
          history={history}
          isRandomGame={true}
          userId={user.userId}
        />
        <CreateButton
          history={history}
          isRandomGame={false}
          userId={user.userId}
        />
      </div>
    );
  }
}

export default Create;
