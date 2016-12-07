import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation } from '../actions/map'
import { getStatus } from '../actions/user'
import MapWrapper from './MapWrapper'

class ResultsMap extends Component {
  handleMapLoad = this.handleMapLoad.bind(this)
  handleMapClick = this.handleMapClick.bind(this)
  loaded = this.loaded.bind(this)

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick(event) {
    console.log("dickbutt")
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
    // this.props.getRESULTS
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
            markers={this.props.markers}
          />
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
    getStatus
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMap)
