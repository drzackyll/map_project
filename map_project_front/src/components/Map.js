import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation, setMarker, submitMarker } from '../actions/map'


const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      zoom={17}
      center={props.center}
      options={{
        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true
      }}
      onClick={props.onMapClick}
    >
      <Marker
        {...props.marker}
      />
    </GoogleMap>
  ))
)

class Map extends Component {
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
      this.props.findLocation(position.coords)
    })
  }

  render() {
    return (
       this.loaded() ? (
        <div style={{height: `600px`}}>
          <MapWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYpyQDXZ3DL9e-zmyc4Fs0JViGlgFj58"
            loadingElement={
              <div style={{ height: `100%` }}>
                <h1>Loading...</h1>
              </div>
            }
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
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
    submitMarker
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
