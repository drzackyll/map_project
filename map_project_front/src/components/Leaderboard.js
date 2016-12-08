import React from 'react'

function Leaderboard(props) {

  const data_rows = props.data.list.map((user, index) =>
    <tr key={user.username}>
      <td>{index + 1}.</td>
      <td>{user.username}</td>
      <td>{user.score}</td>
    </tr>
  )

  return (
    <div className={props.data.id}>
      <h2>Top {props.data.id}</h2>
      <table>
        <tbody>
          {data_rows}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
