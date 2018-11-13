import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GameFinished extends Component {
  state = {
    shouldGoToHome: false,
  };
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ shouldGoToHome: true });
      }.bind(this),
      5000
    );
  }
  render() {
    const { winnerRel = {}, userId, history } = this.props;
    if (this.state.shouldGoToHome) {
      history.push('/', {
        state: {
          initialLoad: false,
        },
      });
    }
    if (winnerRel.id === userId) {
      return <h3 className="game-finished">Holy cow you WON!</h3>;
    }
    if (winnerRel.id && winnerRel.username) {
      return (
        <h3 className="game-finished">{`Holy cow you LOST! ${
          winnerRel.username
        } won!`}</h3>
      );
    }
    if (winnerRel.id) {
      return <h3 className="game-finished">{`Holy cow you LOST!`}</h3>;
    }
    return null;
  }
}

export default withRouter(GameFinished);
