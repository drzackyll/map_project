import React from 'react'
import { Pie } from 'react-chartjs'

function PieChart(props) {
  const data = [
    {
      value: `${props.count.human_count}`,
      color: "#287FCC",
      highlight: "#1B578C",
      label: "Humans"
    },
    {
      value: `${props.count.zombie_count}`,
      color: "#F75448",
      highlight: "#B73E35",
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
