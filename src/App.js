import React, { Component } from 'react'

import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ClarifaiTest from './components/ClarifaiTest'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={ClarifaiTest} />
          <Route component={404} />
        </Switch>
      </Router>
    )
  }
}

export default App
