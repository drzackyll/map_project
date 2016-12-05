import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, findLocation, setLocation } from '../actions/actions'
import Map from './Map'

function Home(props) {
  return (
    <div>
      <Map />
      <button onClick={props.setLocation.bind(this)}>Set Location</button>
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
