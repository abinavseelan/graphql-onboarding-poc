const jwt = require('jsonwebtoken');

const { SECRET } = require('./constants');

const createToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, SECRET, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve(token);
    });
  });
}

module.exports = {
  Query: {
    channels: async (_, { owner }, { dataSources, user }) => {
      return dataSources.channelsAPI.getChannels({ owner: user.username });
    }
  },
  Mutation: {
    register: async (_, { username, password }, { dataSources }) => {
      return dataSources.authAPI.register({
        username,
        password,
      });
    },
    login: async (_, { username, password }, { dataSources, res }) => {
      const response = await dataSources.authAPI.login({
        username,
        password,
      });

      const token = await createToken({
        sessionID: response.sessionID,
        username,
      });

      res.cookie('TOKEN', token);

      return {
        isAuthenticated: true,
      };
    }
  }
}
