export function createUser(username, password) {
  return {type: "CREATE_USER", payload: {username, password} }
}
