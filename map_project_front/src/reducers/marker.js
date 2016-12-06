export default function marker(state = {position: {lat: 0, lng: 0}}, action){
  switch (action.type) {
    case "SET_MARKER":
      return action.payload
    case "GET_STATUS":
      return {position: {lat: parseFloat(action.payload.marker.position.lat), lng: parseFloat(action.payload.marker.position.lng)}}
    case "LOGOUT":
      return {position: {lat: 0, lng: 0}}
    default:
      return state
  }
}
