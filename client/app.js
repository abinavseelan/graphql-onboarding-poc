import React from 'react';
import { Query } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ChannelSelector from './pages/ChannelSelector';

import { IS_LOGGED_IN } from './queries';

const App = () => {

  const renderRoutes = () => {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={ChannelSelector}
          />
        </Switch>
      </Router>
    )
  }

  const renderLogin = () => {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/login'
            component={Login}
          />
          <Route
            exact
            path='/register'
            component={Register}
          />
          <Route
            path='*'
            render={() => (
              <Redirect to='/login' />
            )}
          />
        </Switch>
      </Router>
    )
  }
  return (
    <Query query={IS_LOGGED_IN}>
      {
        ({data}) => (
          data.isAuthenticated ? renderRoutes() : renderLogin()
        )
      }
    </Query>
  );
}

export default App;
