import React from 'react';
import { withApollo, Query } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import OrgCreator from './pages/OrgCreator';
import OrgSelector from './pages/OrgSelector';

import { IS_LOGGED_IN } from './queries';

const App = () => {

  const renderRoutes = () => {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/create'
            component={OrgCreator}
          />
          <Route
            exact
            path='/'
            component={OrgSelector}
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
