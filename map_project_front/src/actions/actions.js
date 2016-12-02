import $ from 'jquery'

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

export function getUser() {
  const promise = $.ajax({
    url: "http://localhost:3000/users",
    type: "GET",
    headers: {AUTHORIZATION: localStorage.token},
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "GET_USER",
    payload: promise
  }
}

export function findLocation() {
  const promise = $.ajax({
    url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDtgntWyuOLb7zOOlFbZUlQjYnMYe4vcuc",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "FIND_LOCATION",
    payload: promise
  }
}

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
