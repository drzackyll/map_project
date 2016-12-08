import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation, setMarker, submitMarker } from '../actions/map'
import { getStatus } from '../actions/user'
import MapWrapper from './MapWrapper'

class NewMoveMap extends Component {
  handleMapLoad = this.handleMapLoad.bind(this)
  handleMapClick = this.handleMapClick.bind(this)
  loaded = this.loaded.bind(this)
  markerMessage = this.markerMessage.bind(this)

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick(event) {
    const markerLat = event.latLng.lat()
    const markerLng = event.latLng.lng()
    this.props.setMarker(markerLat, markerLng)
  }

  handleButtonClick(event) {
    const markerLat = this.props.markers.user.position.lat
    const markerLng = this.props.markers.user.position.lng
    this.props.submitMarker(markerLat, markerLng)
  }

  loaded() {
    const nearbyMarkersEmpty = this.props.markers.nearby.length === 0
    const locationFound = !!this.props.location.lat

    return nearbyMarkersEmpty && locationFound
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.getStatus().then(
        this.props.findLocation(position.coords)
      )
    })
  }

  markerMessage() {
    if (this.props.user.zombie && this.props.markers.status === "created") {
      return "Mwwaaahh I eat here tonight"
    } else if (this.props.user.zombie && this.props.markers.status === "updated") {
      return "Blergghh No I eat here instead grrrr"
    } else if (!this.props.user.zombie && this.props.markers.status === "created") {
      return "Looks safe enough. I'll hide here tonight!"
    } else if (!this.props.user.zombie && this.props.markers.status === "updated"){
      return "I'll hide here instead."
    } else {
      return ""
    }
  }

  render() {
    return (
       this.loaded() ? (
        <div style={{height: `600px`}}>
          <h3>{this.props.user.zombie ? "You're a zombie! Go find a place to eat people!" : "You're a human! Find a place to hide from the zombies!"}</h3>
          <MapWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYpyQDXZ3DL9e-zmyc4Fs0JViGlgFj58"
            loadingElement={ <div style={{ height: `100%` }}><h1>Loading...</h1></div> }
            containerElement={ <div style={{ height: `100%` }} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            center={{lat: this.props.location.lat, lng: this.props.location.lng}}
            markers={this.props.markers}
          />
          <button onClick={this.handleButtonClick.bind(this)}>Set Location</button>
          {this.markerMessage()}
        </div>
      ) : (
        <h1>Loading...</h1>
      )
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    findLocation,
    setMarker,
    submitMarker,
    getStatus
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMoveMap)
