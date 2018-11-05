import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClarifaiTest from './components/ClarifaiTest'

import Header from './components/Header'
import Home from './pages/Home'
import NoMatch from './components/404'
import Game from './pages/Game'
import Close from './pages/Close'
import logo from './static/svgs/logo.svg'
import './styles/style.scss'

const LOADING_PHRASE = 'Welcome to'

function* typewriter() {
  for (let letter of LOADING_PHRASE) {
    yield letter
  }
}

class App extends Component {
  state = {
    typewriterGenerator: typewriter(),
    logoClassName: '',
    loadingStateClassName: '',
    loadingPhrase: {
      value: '',
      done: false
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loadingStateClassName: 'loaded'
      })
    }, 3000)
  }

  render() {
    const {
      loadingStateClassName,
      typewriterGenerator,
      loadingPhrase,
      logoClassName
    } = this.state
    const nextLetter = typewriterGenerator.next().value
    if (nextLetter) {
      setTimeout(() => {
        this.setState({
          loadingPhrase: {
            value: loadingPhrase.value + nextLetter
          }
        })
      }, 150)
    } else {
      setTimeout(() => {
        this.setState({
          loadingPhrase: {
            value: ''
          },
          logoClassName: 'show'
        })
      }, 750)
    }
    return (
      <>
        <div className={`loadingScreen ${loadingStateClassName}`}>
          <div className="typewriter">{loadingPhrase.value}</div>
          <img
            className={`loading--logo ${logoClassName}`}
            src={logo}
            alt="logo"
          />
        </div>
        <div className="app">
          <Header />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/lobby" component={Game} />
              <Route exact path="/test" component={ClarifaiTest} />
              <Route exact path="/closeAllGames" component={Close} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>
      </>
    )
  }
}

export default App
