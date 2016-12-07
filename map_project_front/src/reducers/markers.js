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
      return {
        user: {
          position: {
            lat: action.payload.lat,
            lng: action.payload.lng
          },
          icon: state.user.icon
        },
        nearby: []
      }
    case "GET_STATUS":
      return {
        user: {
          position: {
            lat: parseFloat(action.payload.marker.position.lat),
            lng: parseFloat(action.payload.marker.position.lng)
          },
          icon: {
            url: `/images/user-${iconSelector(action.payload.user.zombie)}.png`,
            scaledSize: {
              height: 40,
              width: 40
            },
            anchor: {x: 20, y: 20}
          }
        },
        nearby: []
      }
    case "GET_RESULTS":

      // Figure out what to do with action.payload.message ("human-loss", "human-win", "zombie-loss", "zombie-win")

      return {
        user: {
          position: {
            lat: parseFloat(action.payload.markers.user.position.lat),
            lng: parseFloat(action.payload.markers.user.position.lng)
          },
          icon: {
            url: `/images/user-${iconSelector(action.payload.zombie)}.png`,
            scaledSize: {
              height: 40,
              width: 40
            },
            anchor: {x: 20, y: 20}
          },
          zIndex: 99999
        },
        nearby: action.payload.markers.nearby.map(marker => {
          return {
            position: {
              lat: parseFloat(marker.position.lat),
              lng: parseFloat(marker.position.lng)
            },
            icon: {
              url: `/images/nearby-${iconSelector(marker.zombie)}.png`,
              scaledSize: {
                height: 40,
                width: 40
              },
              anchor: {x: 20, y: 20}
            },
            username
          }
        }),
        date: action.payload.markers.date,
        message: action.payload.message
      }
    case "LOGOUT":
      return defaultState
    default:
      return state
  }
}
