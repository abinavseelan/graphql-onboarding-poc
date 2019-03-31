const { RESTDataSource } = require('apollo-datasource-rest');

class ChannelAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:4000/channels/'
  }

  async getChannels({ owner }) {
    const response = await this.get(`${owner}`);

    return Array.isArray(response.channels)
      ? response.channels.map(channel => this.channelReducer(channel))
      : [];
  }

  channelReducer(channel) {
    return {
      id: channel.id,
      name: channel.name,
      owner: channel.owner,
    };
  }
}

module.exports = ChannelAPI;
