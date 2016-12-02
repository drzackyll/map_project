import { combineReducers } from 'redux'

function user(state = {}, action){
  switch (action.type) {
    case "CREATE_USER":
    case "GET_USER":
    case "LOGIN":
      if (!!action.payload.error) {
        alert(action.payload.error)
        return state
      } else {
        localStorage.setItem("token", action.payload.jwt)
        return action.payload.user
      }
    case "LOGOUT":
      localStorage.removeItem('token')
      return {}
    case "FIND_LOCATION":
      const location = {latitude: action.payload.location.lat, longitude: action.payload.location.lng}
      return Object.assign({}, state, location)
    default:
      return state
  }
}

const rootReducer = combineReducers({ user })

export default rootReducer
