import React, { Component } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import Image from '../components/Image'
import Logo from '../images/logo.svg'

export default class IndexPage extends Component {
  state = {
    loadingStatus: '',
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loadingStatus: 'hidden' })
    }, 1000)
  }

  render() {
    const { loadingStatus } = this.state
    return (
      <Layout>
        <div className={`loading-screen ${loadingStatus}`}>
          <Logo />
        </div>
      </Layout>
    )
  }
}
