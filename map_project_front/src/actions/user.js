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

export function getStatus(){
  const promise = $.ajax({
    url: "http://localhost:3000/users",
    type: "GET",
    data: {jwt: localStorage.token},
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "GET_STATUS",
    payload: promise
  }
}
