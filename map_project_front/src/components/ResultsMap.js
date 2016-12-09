import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation, getResults } from '../actions/map'
import MapWrapper from './MapWrapper'
import Loading from './Loading'

class ResultsMap extends Component {
  handleMapLoad = this.handleMapLoad.bind(this)
  handleMapClick = this.handleMapClick.bind(this)
  loaded = this.loaded.bind(this)

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick(event) {
    console.log("Dang it Bobby!")
  }

  loaded() {
    const messageExists = !!this.props.markers.message
    return messageExists
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.getResults().then(
        this.props.findLocation(position.coords)
      )
    })
  }

  render() {
    return (
       this.loaded() ? (
        <div style={{height: `600px`}}>
          <h2>Results for {this.props.markers.date}</h2>
          <h4>{this.props.markers.message}</h4>
          <MapWrapper
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYpyQDXZ3DL9e-zmyc4Fs0JViGlgFj58"
            loadingElement={ <Loading /> }
            containerElement={ <div style={{ height: `100%` }} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            center={this.props.markers.user.position}
            markers={this.props.markers}
          />
        </div>
      ) : (
        <Loading />
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
