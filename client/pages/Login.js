import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import cookies from 'browser-cookies';

import { LOGIN_USER } from '../mutations';
import { IS_LOGGED_IN } from '../queries';

class Login extends React.Component {
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
      <React.Fragment>
        <Mutation
          mutation={LOGIN_USER}
          update={(cache, data) => {
            if (data.token) {
              cookies.set('TOKEN', data.token);
            }

            cache.writeQuery({
              query: IS_LOGGED_IN,
              data: {
                isAuthenticated: data.isAuthenticated,
              }
            });

            // window.location.href = '/';
          }}
        >
          {
            (loginUser, { loading, error, data }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginUser({
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
                <input type='submit' value='Login' disabled={loading} />
                {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
              </form>

            )
          }
        </Mutation>
        <div>
          <p>Don't have an account? <Link to='/register'>Click here to register</Link></p>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
