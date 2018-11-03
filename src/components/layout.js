import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import '../style/layout.scss'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  render() {
    const { children } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            hasura {
              game_data {
                id
                keyword
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
          </>
        )}
      />
    )
  }
}
