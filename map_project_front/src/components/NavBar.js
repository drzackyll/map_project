import React from 'react'

import { Link } from 'react-router'

function NavBar() {
  return (
    <div className="NavBar">
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </ul>
    </div>
  )
}

export default NavBar
