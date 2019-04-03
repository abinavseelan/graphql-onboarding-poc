import React from 'react';
import { Mutation } from 'react-apollo';

import { REGISTER_USER } from '../mutations';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <Mutation mutation={REGISTER_USER}>
        {
          (registerUser, { loading, error, data }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                registerUser({
                  variables: {
                    username: this.state.email,
                    password: this.state.password,
                  }
                })
              }}
            >
              <input
                name='email'
                type='email'
                placeholder='Email'
                value={this.state.email}
                onChange={this.handleInput}
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handleInput}
              />
              <input type='submit' value='Register' />
              {loading && <p>Registering...</p>}
              {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            </form>
          )
        }
      </Mutation>
    );
  }
}

export default Register;
