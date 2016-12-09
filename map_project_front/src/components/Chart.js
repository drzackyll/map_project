import React from 'react'
import { Pie } from 'react-chartjs'

function PieChart(props) {
  const data = [
    {
      value: `${props.count.human_count}`,
      color: "green",
      highlight: "#329932",
      label: "Humans"
    },
    {
      value: `${props.count.zombie_count}`,
      color: "red",
      highlight: "#FF4C4C",
      label: "Zombies"
    }
  ]

  return (
    <div className="PieChart">
      <h2>Human/Zombie Ratio</h2>
      <table>
        <tbody>
          <tr>
            <th className="no-bottom">
              <Pie data={data} width="200" height="200" />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PieChart
