import React, { Component } from 'react'
// import { Link } from 'gatsby'
import { Subscription, Mutation } from 'react-apollo'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
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
      <StaticQuery
        query={graphql`
          query GamesQuery {
            hasura {
              games {
                id
                status
              }
            }
          }
        `}
        render={({ hasura: { games } }) => {
          const hasGamesNotStarted = games.some(
            ({ status }) => status === 'not-started'
          )
          return (
            <>
              <Layout>
                <div className={`loading-screen ${loadingStatus}`}>
                  <Logo />
                </div>
                {hasGamesNotStarted ? (
                  <button>click me</button>
                ) : (
                  <button disabled>click me</button>
                )}
              </Layout>
            </>
          )
        }}
      />
    )
  }
}
