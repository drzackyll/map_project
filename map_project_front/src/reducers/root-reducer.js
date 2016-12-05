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
      const location = {lat: action.payload.latitude, lng: action.payload.longitude}
      return Object.assign({}, state, location)
    default:
      return state
  }
}

function marker(state = {position: {lat: 0, lng: 0}}, action){
  switch (action.type) {
    case "SET_MARKER":
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({ user, marker })

export default rootReducer
