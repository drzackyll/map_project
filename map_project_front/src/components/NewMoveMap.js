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

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick(event) {
    const markerLat = event.latLng.lat()
    const markerLng = event.latLng.lng()

    this.props.setMarker(markerLat, markerLng)
  }

  handleButtonClick(event) {
    const markerLat = this.props.marker.position.lat
    const markerLng = this.props.marker.position.lng
    this.props.submitMarker(markerLat, markerLng)
  }

  loaded() {
    return !!this.props.location.lat
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.getStatus().then(
        this.props.findLocation(position.coords)
      )
    })
    // this.props.getStatus - WE NEED TO CODE THIS GET STATUS FUNCTION
  }

  render() {
    return (
       this.loaded() ? (
        <div style={{height: `600px`}}>
          <MapWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYpyQDXZ3DL9e-zmyc4Fs0JViGlgFj58"
            loadingElement={ <div style={{ height: `100%` }}><h1>Loading...</h1></div> }
            containerElement={ <div style={{ height: `100%` }} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            center={{lat: this.props.location.lat, lng: this.props.location.lng}}
            marker={this.props.marker}
          />
          <button onClick={this.handleButtonClick.bind(this)}>Set Location</button>
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
