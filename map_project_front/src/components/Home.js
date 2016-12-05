import React from 'react'
import Map from './Map'

function Home(props) {
  return (
    <div>
      <Map />
      <button onClick={props.setLocation.bind(this)}>Set Location</button>
    </div>
  )
}

export default Home
