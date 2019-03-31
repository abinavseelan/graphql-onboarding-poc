const { RESTDataSource } = require('apollo-datasource-rest');

class AuthAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:4000/auth/'
  }
}

module.exports = AuthAPI;
