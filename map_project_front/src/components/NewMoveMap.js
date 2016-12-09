import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { findLocation, setMarker, submitMarker } from '../actions/map'
import { getStatus } from '../actions/user'
import MapWrapper from './MapWrapper'
import Loading from './Loading'

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

  randomZombieTalk() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const zombieTalk = [
      '"Mmrraaaahhhhh..."',
      '"Bleeggghhhhhh..."',
      '"Hhrrruuurrggg..."',
      '"Nnyuuuuhhhhhh..."',
      '"Ggggrrreeeehh..."'
    ]

    return zombieTalk[getRandomIntInclusive(0,4)]
  }

  markerMessage() {
    const statusIsCreated = this.props.markers.status === "created"
    const statusIsUpdated = this.props.markers.status === "updated"

    if (this.props.user.zombie && (statusIsCreated || statusIsUpdated)) {
      return this.randomZombieTalk()
    } else if (statusIsCreated) {
      return `"Looks safe enough. I'll hide here tonight."`
    } else if (statusIsUpdated){
      return `"On second thought, I think I'll hide here instead."`
    } else {
      return ""
    }
  }

  render() {
    return (
       this.loaded() ? (
        <div className="row">
          <div className="three columns">
            <h3>{this.props.user.zombie ? "You're a zombie. Find humans to feed your unending hunger." : "You're a human. Find a place to hide from the zombies."}</h3>
            <button onClick={this.handleButtonClick.bind(this)}>Set Location</button>
            <h4>{this.markerMessage()}</h4>
          </div>
          <div style={{height: `600px`}} className="nine columns">
            <MapWrapper
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvYpyQDXZ3DL9e-zmyc4Fs0JViGlgFj58"
              loadingElement={ <Loading /> }
              containerElement={ <div style={{ height: `100%` }} /> }
              mapElement={ <div style={{ height: `100%` }} /> }
              onMapLoad={this.handleMapLoad}
              onMapClick={this.handleMapClick}
              center={{lat: this.props.location.lat, lng: this.props.location.lng}}
              markers={this.props.markers}
            />
          </div>
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
    setMarker,
    submitMarker,
    getStatus
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMoveMap)
