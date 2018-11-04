import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  uri: 'http://sicc-piccs-api.herokuapp.com/',
  link: new HttpLink(),
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>hello apollo</h2>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
