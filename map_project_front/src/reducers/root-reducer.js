import { combineReducers } from 'redux'
import user from './user'
import location from './location'
import marker from './marker'

const rootReducer = combineReducers({ user, location, marker })

export default rootReducer
