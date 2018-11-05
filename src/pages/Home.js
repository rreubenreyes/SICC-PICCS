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
        <p
          style={{
            padding: '0 1rem',
            textAlign: 'center'
          }}>
          This app was developed in a small incubator inside Microsoft. 🥑 😉
          <br />
          <sub>
            <em>#JAMstackHackathon2018</em>
          </sub>
        </p>
        <Create history={history} />
        <Join history={history} />
      </div>
    )
  }
}
