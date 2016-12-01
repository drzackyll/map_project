import { combineReducers } from 'redux'

function user(state = {}, action){
  switch (action.type) {
    case "CREATE_USER":
    case "LOGIN":
      if (!!action.payload.error) {
        alert(action.payload.error)
        return state
      } else {
        localStorage.setItem("token", action.payload.jwt)
        return action.payload.user
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({ user })

export default rootReducer
