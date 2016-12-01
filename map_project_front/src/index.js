import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { Router, hashHistory } from 'react-router'
import Routes from './routes'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={Routes} />
  </Provider>,
  document.getElementById('root')
)
