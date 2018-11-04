import React, { Component } from "react";
import logo from "./logo.svg";
import Create from "./components/Create";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h2>hello apollo</h2>
        <Create />
      </div>
    );
  }
}

export default App;
