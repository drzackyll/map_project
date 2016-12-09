import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions/session'
import { loggedIn } from '../utilities/utilities'
import { browserHistory } from 'react-router'

function NavBar(props) {
  function handleClick(event) {
    event.preventDefault()
    props.logout()
    browserHistory.push('/')
  }

  const navBarItems = () => {
    if (loggedIn()) {
      return (
        <ul>
          <li><a href='#' onClick={handleClick.bind(this)}>Log Out</a></li>
          <li><Link to='/scores'>Scoreboard</Link></li>
          <li><Link to='/newmove'>New Move</Link></li>
          <li><Link to='/results'>Results</Link></li>
          <li><Link to='/'>About</Link></li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/'>About</Link></li>
        </ul>
      )
    }
  }

  return (
    <div className="NavBar row">
      <div className="four columns">
        <h1>Z-Tag</h1>
      </div>
      <div className="eight columns">
        {navBarItems()}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
