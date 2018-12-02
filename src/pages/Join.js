import React, { Component } from 'react';
import JoinSubscription from '../components/JoinSubscription';
import FlexWrapper from '../components/FlexWrapper';
import Header from '../components/Header';

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
        <Header />
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
