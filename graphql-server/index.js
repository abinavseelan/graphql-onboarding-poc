const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const AuthAPI = require('./datasources/auth');
const ChannelsAPI = require('./datasources/channels');
const { SECRET } = require('./constants');

const port = 5000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
}

app.use(morgan('short'));
app.use(cookieParser());

const unpackToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    authAPI: new AuthAPI(),
    channelsAPI: new ChannelsAPI(),
  }),
  context: async ({req, res}) => {
    const { TOKEN } = req.cookies;

    let userData;

    if (TOKEN) {
      userData = await unpackToken(TOKEN);
    }

    return {
      req,
      res, // Required for setting the cookie in the login resolver
      user: userData,
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
