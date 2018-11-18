import React, { Component } from 'react';
import JoinSubscription from '../components/JoinSubscription';
import FlexWrapper from '../components/FlexWrapper';

class Join extends Component {
  render() {
    const {
      history,
      location: {
        state: { user },
      },
    } = this.props;
    return (
      <FlexWrapper>
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
      </FlexWrapper>
    );
  }
}

export default Join;
