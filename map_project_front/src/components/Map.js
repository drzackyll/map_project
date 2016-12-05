import React, { Component } from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, findLocation, setLocation } from '../actions/actions'

const MapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    zoom={16}
    center={{ lat: 40.7052839, lng: -74.0162136 }}
    options={{
      disableDefaultUI: true,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker {...marker} />
    ))}
  </GoogleMap>
))

class Map extends Component {
  state = {
    markers: [{
      position: {
        lat: 40.705329,
        lng: -74.014047
      },
      key: `Flatiron School`,
      defaultAnimation: 2,
    }],
  }

  handleMapLoad = this.handleMapLoad.bind(this)
  handleMapClick = this.handleMapClick.bind(this)

  handleMapLoad(map) {
    this._mapComponent = map
    this.props.getUser()
    this.props.findLocation()
    this.props.setLocation(this.props.user.lat, this.props.user.lng)
  }

  handleMapClick(event) {

  }

  render() {
    return (
      <div style={{height: `600px`}}>
        <MapWrapper
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
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
    setLocation
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
