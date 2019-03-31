const { RESTDataSource } = require('apollo-datasource-rest');

class AuthAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:4000/auth/'
  }

  async register({ username, password }) {
    await this.post('/register', {
      username,
      password,
    });

    return true;
  }

  async login({ username, password }) {
    const response = await this.post('/login', {
      username,
      password,
    });

    return {
      sessionID: response.sessionID
    };
  }
}

module.exports = AuthAPI;
