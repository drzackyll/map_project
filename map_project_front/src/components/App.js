import React from 'react'
import NavBar from './NavBar'
import Map from './Map'

function App(props) {
  return (
    <div className="App">
      <NavBar />
      {props.children}
      <Map />
    </div>
  )
}

export default App;
