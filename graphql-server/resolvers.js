module.exports = {
  Query: {
    channels: async (_, { owner }, { dataSources }) => {
      return dataSources.channelsAPI.getChannels({ owner });
    }
  }
}
