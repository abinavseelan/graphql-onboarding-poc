import gql from 'graphql-tag';

export const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isAuthenticated @client
  }
`;

export const GET_CHANNELS = gql`
  query getChannelsForUser {
    channels {
      id
      name
    }
  }
`;
