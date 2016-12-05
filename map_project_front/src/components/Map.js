import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, findLocation, setLocation, setMarker } from '../actions/actions'

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

  handleMapLoad(map) {
    this._mapComponent = map
    this.props.getUser()
    navigator.geolocation.getCurrentPosition(position => {
      this.props.findLocation(position.coords)
    })
  }

  handleMapClick(event) {
    const markerLat = event.latLng.lat()
    const markerLng = event.latLng.lng()

    this.props.setMarker(markerLat, markerLng)
  }

  render() {
    return (
      <div style={{height: `600px`}}>
        <MapWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYpyQDXZ3DL9e-zmyc4Fs0JViGlgFj58"
          loadingElement={
            <div style={{ height: `100%` }}>
              Loading...
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
          center={{lat: this.props.user.lat, lng: this.props.user.lng}}
          marker={this.props.marker}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
    findLocation,
    setLocation,
    setMarker
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
