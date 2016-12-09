const defaultState = {
  user: {
    position: {
      lat: 0,
      lng: 0
    }
  },
  nearby: [],
  status: ""
}

function iconSelector(zombie) { // finish this
  if (zombie) {
    return "zombie"
  } else {
    return "human"
  }
}

function parseMessage(message) {
  switch (message.status) {
    case "hl":
      return `As you searched for supplies, you were caught off-guard by ${message.neighbor}. You fought bravely, but in the end, you were infected. You have become a zombie!`
    case "hw":
      return `By staying alert and carefully choosing your actions, you survived the night. You crossed paths with ${message.neighbor}, trading stories and supplies.`
    case "hd":
      return "The night is strangely empty. You eat your scavenged beans and rest easy for now."
    case "zw":
      const joined_infected = [message.infected.slice(0, -1).join(', '), message.infected.slice(-1)[0]].join(message.infected.length < 2 ? '' : ' and ')
      return `In the cold dark night, you stumbled upon unaware prey. Your unending hunger for human flesh was momentarily satisfied. You infected ${joined_infected}.`
    case "zl":
      return "You shambled aimlessly through the night, finding no humans. Your hunger grows ever more unsated, but tomorrow is a new day, and the scent of human flesh is in the air."

    default:
      return "ERROR: SOMETHING BROKE"
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
        nearby: [],
        status: ""
      }
    case "SUBMIT_MARKER":
      return Object.assign({}, state, action.payload)
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
        nearby: [],
        status: ""
      }
    case "GET_RESULTS":
      return {
        user: {
          position: {
            lat: parseFloat(action.payload.markers.user.position.lat),
            lng: parseFloat(action.payload.markers.user.position.lng)
          },
          icon: {
            url: `/images/user-${iconSelector(action.payload.markers.user.zombie)}.png`,
            scaledSize: {
              height: 40,
              width: 40
            },
            anchor: {x: 20, y: 20}
          },
          zIndex: 9999999999
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
            title: marker.username,
            key: marker.username
          }
        }),
        date: action.payload.markers.date,
        message: parseMessage(action.payload.message)
      }
    case "LOGOUT":
      return defaultState
    default:
      return state
  }
}
