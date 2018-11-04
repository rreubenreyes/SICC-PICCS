import React, { Component } from 'react'
import Join from '../components/Join'
import Create from '../components/Create'

import logo from '../static/svgs/logo.svg'

export default class Home extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    console.log('hello')
  }

  render() {
    const { history } = this.props
    return (
      <div className="home">
        <Create history={history} />
        <Join history={history} />
      </div>
    )
  }
}
