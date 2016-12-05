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
