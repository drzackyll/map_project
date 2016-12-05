import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation, setMarker } from '../actions/actions'

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

  loaded() {
    return !!this.props.user.lat
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.findLocation(position.coords)
    })
  }

  render() {
    return (
      <div style={{height: `600px`}}>
        { this.loaded() ? (
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
            center={{lat: this.props.user.lat, lng: this.props.user.lng}}
            marker={this.props.marker}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    findLocation,
    setMarker
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
