import $ from 'jquery'

export function getScores(){
  const promise = $.ajax({
    url: "http://localhost:3000/scores",
    type: "GET",
    data: {jwt: localStorage.token},
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "GET_SCORES",
    payload: promise
  }
}
