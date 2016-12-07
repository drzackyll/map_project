import $ from 'jquery'

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
