import { combineReducers } from 'redux'
import user from './user'
import location from './location'
import markers from './markers'
import scores from './scores'

const rootReducer = combineReducers({ user, location, markers, scores })

export default rootReducer
