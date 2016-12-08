import React from 'react'

function Leaderboard(props) {

  const data_rows = props.data.list.map((user, index) =>
    <tr key={user.username}>
      <td>{index + 1}.</td>
      <td>{user.username}</td>
      <td>{user.score}</td>
    </tr>
  )

  function score_header() {
    if (props.data.id === "Zombie") {
      return <td>Humans<br/>Infected</td>
    } else {
      return <td>Days<br/>Survived</td>
    }
  }

  return (
    <div className={props.data.id}>
      <h2>Top {props.data.id}s</h2>
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>User</td>
            {score_header()}
          </tr>
        </thead>
        <tbody>
          {data_rows}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
