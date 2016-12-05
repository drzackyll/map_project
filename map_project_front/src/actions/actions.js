import $ from 'jquery'


// User Actions

export function createUser(username, password) {
  const promise = $.ajax({
    url: "http://localhost:3000/users",
    type: "POST",
    data: JSON.stringify({auth: {username, password}}),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "CREATE_USER",
    payload: promise
  }
}


// Session Actions

export function login(username, password) {
  const promise = $.ajax({
    url: "http://localhost:3000/sessions",
    type: "POST",
    data: JSON.stringify({auth: {username, password}}),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "LOGIN",
    payload: promise
  }
}

export function logout() {
  return {
    type: "LOGOUT"
  }
}


// Map Actions

export function findLocation(coords) {
  return {
    type: "FIND_LOCATION",
    payload: coords
  }
}

export function setMarker(lat, lng) {
  return {
    type: "SET_MARKER",
    payload: { position: { lat, lng } }
  }
}

export function submitMarker(lat, lng) {
  const promise = $.ajax({
    url: "http://localhost:3000/markers",
    type: "POST",
    data: JSON.stringify({data: {lat, lng}}),
    jwt: localStorage.token,
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "SUBMIT_MARKER",
    payload: promise
  }
}
