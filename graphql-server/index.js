const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const AuthAPI = require('./datasources/auth');
const ChannelsAPI = require('./datasources/channels');

const port = 5000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
}

app.use(morgan('short'));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    authAPI: new AuthAPI(),
    channelsAPI: new ChannelsAPI(),
  }),
  context: ({req, res}) => {
    return {
      req,
      res, // Required for setting the cookie in the login resolver
    }
  }
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: corsOptions,
});

app.listen(port, () => {
  console.log(`GraphQL express server running on port ${port}`);
});
