import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, findLocation, setLocation } from '../actions/actions'

function Home(props) {
  function handleClick() {
    props.getUser()
    props.findLocation()
    props.setLocation(props.user.lat, props.user.lng)
  }

  return (
    <div>
      <button onClick={handleClick.bind(this)}>Get location</button>
      <p>
        {props.user.username}
      </p>
      <p>
        {props.user.lat}
      </p>
      <p>
        {props.user.lng}
      </p>
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
