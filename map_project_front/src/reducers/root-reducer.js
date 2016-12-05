import { combineReducers } from 'redux'
import user from './user-reducer'
import location from './location-reducer'
import marker from './marker-reducer'

const rootReducer = combineReducers({ user, location, marker })

export default rootReducer
