import React, { Component } from "react";
import Join from "./Join";
import Create from "./Create";

export default class Home extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    console.log("hello");
  };

  render() {
    const { history } = this.props;
    return (
      <div className="Home">
        <h1>Welcome to SICC PICS</h1>
        <Create history={history} />
        <Join history={history} />
      </div>
    );
  }
}
