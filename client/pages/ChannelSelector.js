import React from 'react';
import { Query } from 'react-apollo';

import { GET_CHANNELS } from '../queries';

class ChannelSelector extends React.Component {
  renderChannelSelector(states) {
    if (states.loading) {
      return (
        <p>Fetching Channels</p>
      );
    }

    if (states.error) {
      return (
        <pre>{JSON.stringify(states.error, null, 2)}</pre>
      );
    }

    return (
      states.data.channels.map((channel) => (
        <p key={channel.id}>{channel.name}</p>
      ))
    )
  }
  render() {
    return (
      <Query query={GET_CHANNELS}>
        {
          ({ loading, error, data }) => this.renderChannelSelector({
              loading,
              error,
              data,
            })
        }
      </Query>
    );
  }
}

export default ChannelSelector;
