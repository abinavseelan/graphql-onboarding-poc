const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    channels(owner: String): [Channel]!
  }

  type Mutation {
    login(username: String, password: String): LoginResponse
    register(username: String, password: String): Boolean
  }

  type Channel {
    id: ID!
    name: String
    owner: String
  }

  type LoginResponse {
    isAuthenticated: Boolean
  }
`;

module.exports = typeDefs;
