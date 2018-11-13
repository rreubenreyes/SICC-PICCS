import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';

console.log(process.env.NODE_ENV);

const GQL_ENDPOINT = 'https://sicc-piccs-api.herokuapp.com/v1alpha1/graphql';

const accessKey = 'cKkwPfe09WEqy26CHGm2'; // TEMPORARY
const HASURA_GRAPHQL_ACCESS_KEY = { 'X-Hasura-Access-Key': accessKey || '' };

const createWebsocketLink = uri => {
  const splitUri = uri.split('//');
  const subscriptionClient = new SubscriptionClient(`wss://${splitUri[1]}`, {
    reconnect: true,
    connectionParams: {
      headers: {
        ...HASURA_GRAPHQL_ACCESS_KEY,
      },
    },
  });

  return new WebSocketLink(subscriptionClient);
};

// set hasura access key
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...HASURA_GRAPHQL_ACCESS_KEY,
    },
  };
});

// hasura endpoint URI
const httpLink = authLink.concat(new HttpLink({ uri: GQL_ENDPOINT }));

const wsLink = createWebsocketLink(GQL_ENDPOINT);
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
