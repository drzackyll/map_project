import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation, getResults } from '../actions/map'
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
      this.props.getResults().then(
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
            center={this.props.markers.user.position}
            markers={this.props.markers}
          />
          <p>Results for {this.props.markers.date}</p>
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
    getResults
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMap)
