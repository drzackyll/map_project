import { combineReducers } from 'redux'

function user(state = {}, action){
  switch (action.type) {
    case "CREATE_USER":
      return action.payload.user
    default:
      return state
  }
}

function jwt(state = null, action){
  switch (action.type) {
    case "CREATE_USER":
      return action.payload.jwt
    default:
      return state
  }
}

const rootReducer = combineReducers({ user, jwt })

export default rootReducer
