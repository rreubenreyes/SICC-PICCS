import React, { Component } from 'react';
import logo from './static/svgs/logo.svg';

export default class SplashScreen extends Component {
  render() {
    return <div />;
  }
}

/*

const LOADING_PHRASE = 'Welcome to';

function* typewriter() {
  for (let letter of LOADING_PHRASE) {
    yield letter;
  }
}

  state = {
    typewriterGenerator: typewriter(),
    logoClassName: '',
    loadingStateClassName: '',
    loadingPhrase: {
      value: '',
      done: false,
    },
  };

  componentDidMount() {
    const userStr = localStorage.getItem('user');
    // Only do animation if first-time user
    if (userStr) {
      this.setState({ loadingStateClassName: 'loaded' });
    } else {
      setTimeout(() => {
        this.setState({
          loadingStateClassName: 'loaded',
        });
      }, 3000);
    }
  }
  render() {
    return (
        <div className="loadingScreen">
          <div className="typewriter" />
          <img className="loading--logo" src={logo} alt="logo" />
        </div>
    )
  }
*/
