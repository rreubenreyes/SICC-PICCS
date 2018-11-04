import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ClarifaiTest from './components/ClarifaiTest'
import Home from './components/Home'
import NoMatch from './components/404'
import Create from './components/Create'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={ClarifaiTest} />
          <Route component={NoMatch} />
        </Switch>
        {/* <Create /> */}
      </Router>
    )
  }
}

export default App
