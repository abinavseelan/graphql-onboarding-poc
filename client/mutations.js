import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String, $password: String) {
    register(username: $username, password: $password)
  }
`;
