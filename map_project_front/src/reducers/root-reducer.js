import { combineReducers } from 'redux'
import user from './user'
import location from './location'
import markers from './markers'

const rootReducer = combineReducers({ user, location, markers })

export default rootReducer
