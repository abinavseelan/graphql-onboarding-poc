module.exports = {
  Query: {
    channels: async (_, { owner }, { dataSources }) => {
      return dataSources.channelsAPI.getChannels({ owner });
    }
  },
  Mutation: {
    register: async (_, { username, password }, { dataSources }) => {
      return dataSources.authAPI.register({
        username,
        password,
      });
    },
    login: async (_, { username, password }, { dataSources }) => {
      return dataSources.authAPI.login({
        username,
        password,
      })
    }
  }
}
