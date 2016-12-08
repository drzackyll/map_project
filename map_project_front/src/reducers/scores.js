export default function scores(state = {human: [], zombie: []}, action){
  switch (action.type) {
    case "GET_SCORES":
      return action.payload.scores
    default:
      return state
  }
}
