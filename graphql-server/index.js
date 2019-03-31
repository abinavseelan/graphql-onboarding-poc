const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const AuthAPI = require('./datasources/auth');
const ChannelsAPI = require('./datasources/channels');

const port = 5000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    authAPI: new AuthAPI(),
    channelsAPI: new ChannelsAPI(),
  })
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen(port, () => {
  console.log(`GraphQL express server running on port ${port}`);
});
