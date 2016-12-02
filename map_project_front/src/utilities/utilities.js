export function loggedIn() {
  return !!localStorage.token
}

export function logOut() {
  localStorage.removeItem('token')
}
