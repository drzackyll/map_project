export default function marker(state = {position: {lat: 0, lng: 0}}, action){
  switch (action.type) {
    case "SET_MARKER":
      return action.payload
    default:
      return state
  }
}
