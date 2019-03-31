const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    channels(owner: String): [Channel]!
  }

  type Mutation {
    login(email: String, password: String): LoginResponse
  }

  type Channel {
    id: ID!
    name: String
    owner: String
  }

  type LoginResponse {
    sessionID: String
  }
`;

module.exports = typeDefs;
