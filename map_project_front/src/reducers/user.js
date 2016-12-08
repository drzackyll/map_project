export default function user(state = {}, action){
  switch (action.type) {
    case "CREATE_USER":
    case "LOGIN":
      if (!!action.payload.error) {
        alert(action.payload.error)
      } else {
        localStorage.setItem("token", action.payload.jwt)
      }
      return {}
    case "LOGOUT":
      localStorage.removeItem('token')
      return {}
    case "GET_STATUS":
    case "GET_SCORES":
      return action.payload.user
    default:
      return state
  }
}
