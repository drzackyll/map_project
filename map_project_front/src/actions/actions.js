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
