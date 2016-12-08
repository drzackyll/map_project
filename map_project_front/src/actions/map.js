import $ from 'jquery'
import { browserHistory } from 'react-router'

export function findLocation(coords) {
  return {
    type: "FIND_LOCATION",
    payload: coords
  }
}

export function setMarker(lat, lng) {
  return {
    type: "SET_MARKER",
    payload: { lat, lng }
  }
}

export function submitMarker(lat, lng) {
  const promise = $.ajax({
    url: "http://localhost:3000/markers",
    type: "POST",
    data: JSON.stringify({data: {lat, lng}, jwt: localStorage.token}),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })

  return {
    type: "SUBMIT_MARKER",
    payload: promise
  }
}

export function getResults(){

  const promise = $.ajax({
    url: "http://localhost:3000/markers",
    type: "GET",
    data: {jwt: localStorage.token},
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  }).done(function(response){
    if (response.error === "no markers"){
    alert("Please set a marker and check back tomorrow!")
    browserHistory.push('/newmove')
    }
  })

  return {
    type: "GET_RESULTS",
    payload: promise
  }
}
