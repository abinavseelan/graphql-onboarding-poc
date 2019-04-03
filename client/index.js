import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import cookies from 'browser-cookies';
import { ApolloProvider } from 'react-apollo';

import App from './app';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

cache.writeData({
  data: {
    isAuthenticated: Boolean(cookies.get('TOKEN')) || false,
  }
})

const client = new ApolloClient({
  cache,
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('app')
)
