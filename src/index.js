import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const GQL_ENDPOINT = 'http://sicc-piccs-api.herokuapp.com/v1alpha1/graphql'

const createWebsocketLink = uri => {
  const splitUri = uri.split('//')
  const subscriptionClient = new SubscriptionClient(`wss://${splitUri[1]}`, {
    reconnect: true
  })

  return new WebSocketLink(subscriptionClient)
}

const httpLink = new HttpLink({ uri: GQL_ENDPOINT })
const wsLink = createWebsocketLink(GQL_ENDPOINT)
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
