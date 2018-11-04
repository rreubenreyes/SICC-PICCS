import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClarifaiTest from "./components/ClarifaiTest";
import Home from "./pages/Home";
import NoMatch from "./components/404";
import Game from "./pages/Game";
import "./styles/style.scss";

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
