import React, { Component } from 'react';
import PlayGame from '../components/PlayGame';
import FlexWrapper from '../components/FlexWrapper';

class Game extends Component {
  render() {
    return (
      <FlexWrapper>
        <PlayGame {...this.props.location.state} />
      </FlexWrapper>
    );
  }
}

export default Game;
