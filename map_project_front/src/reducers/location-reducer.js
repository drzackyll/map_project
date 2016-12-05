export default function location(state = {lat: 0, lng: 0}, action){
  switch (action.type) {
    case "FIND_LOCATION":
      return {lat: action.payload.latitude, lng: action.payload.longitude}
    default:
      return state
  }
}
