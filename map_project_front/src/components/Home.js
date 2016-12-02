import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, getLocation } from '../actions/actions'

function Home(props) {
  function handleClick1() {
    props.getUser()
  }

  function handleClick2() {
    props.findLocation()
  }

  return (
    <div>
      <button onClick={handleClick1.bind(this)}>Get user</button>
      <br/>
      <button onClick={handleClick2.bind(this)}>Find location</button>
      <p>
        {props.user.username}
      </p>
      <p>
        {props.user.latitude}
      </p>
      <p>
        {props.user.longitude}
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
    getLocation
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
