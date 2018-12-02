import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NoMatch from './pages/404';
import Game from './pages/Game';
import Close from './pages/Close';
import Create from './pages/Create';
import Join from './pages/Join';
import './styles/style.scss';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="app">
          <Header />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/lobby" component={Game} />
              <Route exact path="/closeAllGames" component={Close} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
