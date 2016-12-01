import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import UserLogin from './components/UserLogin'
import NewUser from './components/NewUser'

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={UserLogin} />
    <Route path="/signup" component={NewUser} />
  </Route>
)

export default Routes
