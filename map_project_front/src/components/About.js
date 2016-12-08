import React from 'react'
import { Link } from 'react-router'

function About(props) {
  return (
    <div>
      <h4>What is Z-Tag?</h4>
      <p>Z-Tag is a geolocation-based zombie ARG. Users log in and place markers each day to increase their scores. Each user is either a human or a zombie. You will not know where other users are placing their markers until the next day.</p>
      <p>Humans want to stay away from zombies to avoid infection. Try to place your marker near other humans for safety. Each day you survive, your Days Survived score increases.</p>
      <p>Zombies, on the other hand, have an insatiable hunger for human flesh. They also want to place their markers near humans, not for safety, but for sweet, sweet people meat. Also, your Humans Infected score increases.</p>
      <p>If a human is infected, they become a zombie! It is inevitable that in time all human life will be consumed, and the sum of our accomplishments forgotten. But in the meantime, there are meaningless points to be accumulated.</p>
      <h4>How do I play?</h4>
      <p>Sign up <Link to="/signup">here</Link>. Then place your marker on <Link to="/newmove">New Move map</Link>. Check in tomorrow and see what happens!</p>
      <h4>Whose fault is this?</h4>
      <p>Z-Tag is developed by Zack Adams, Caleb Cox, and Robert Lin.</p>
    </div>
  )
}

export default About
