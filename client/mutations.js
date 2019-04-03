import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String, $password: String) {
    register(username: $username, password: $password)
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String, $password: String) {
    login(username: $username, password: $password) {
      isAuthenticated
    }
  }
`;
