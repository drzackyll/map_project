import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import About from './components/About'
import UserLogin from './components/UserLogin'
import NewUser from './components/NewUser'
import NewMoveMap from './components/NewMoveMap'

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={About} />
    <Route path="/login" component={UserLogin} />
    <Route path="/signup" component={NewUser} />
    <Route path="/logout" component={NewUser} />
    <Route path="/newmove" component={NewMoveMap} />
  </Route>
)

export default Routes
