import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { REGISTER_USER } from '../mutations';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
                    username: this.state.username,
                    password: this.state.password,
                  }
                })
              }}
            >
              <input
                name='username'
                type='text'
                placeholder='Username'
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
              <input type='submit' value='Register' disabled={loading} />
              {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
              {data && <p>Registered successfully! Please <Link to='/login'>Login</Link></p>}
            </form>
          )
        }
      </Mutation>
    );
  }
}

export default Register;
