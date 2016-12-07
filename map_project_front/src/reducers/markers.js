const defaultState = {
  user: {
    position: {
      lat: 0,
      lng: 0
    }
  },
  nearby: []
}

function iconSelector(zombie) { // finish this
  if (zombie) {
    return "zombie"
  } else {
    return "human"
  }
}

export default function markers(state = defaultState, action){
  switch (action.type) {
    case "SET_MARKER":
    debugger
      return {
        user: {
          position: {
            lat: action.payload.lat,
            lng: action.payload.lng
          },
          icon: {
            url: `/images/user-${iconSelector(action.payload.zombie)}.png`,
            scaledSize: {
              height: 40,
              width: 40
            }
          }
        }
      }
    case "GET_STATUS":
      debugger
      return {
        user: {
          position: {
            lat: parseFloat(action.payload.marker.position.lat),
            lng: parseFloat(action.payload.marker.position.lng)
          },
          icon: {
            url: `/images/user-${iconSelector(action.payload.zombie)}.png`,
            scaledSize: {
              height: 40,
              width: 40
            }
          }
        }
      }
    case "LOGOUT":
      return {position: {lat: 0, lng: 0}}
    default:
      return state
  }
}
