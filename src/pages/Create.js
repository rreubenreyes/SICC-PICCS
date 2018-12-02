import React, { Component } from 'react';
import CreateContainer from '../components/CreateContainer';
import FlexWrapper from '../components/FlexWrapper';
import Header from '../components/Header';

class Create extends Component {
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
        <CreateContainer
          history={history}
          isRandomGame={true}
          userId={user.userId}
        />
        <CreateContainer
          history={history}
          isRandomGame={false}
          userId={user.userId}
        />
      </FlexWrapper>
    );
  }
}

export default Create;
