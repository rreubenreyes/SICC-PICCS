import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClarifaiTest from "./components/ClarifaiTest";
import Home from "./components/Home";
import NoMatch from "./components/404";
import Game from "./pages/Game";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby" component={Game} />
          <Route exact path="/test" component={ClarifaiTest} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
