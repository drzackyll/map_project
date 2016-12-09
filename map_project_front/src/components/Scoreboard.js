import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { getScores } from '../actions/scores'
import Leaderboard from './Leaderboard'
import Loading from './Loading'
import PieChart from './Chart'

class Scoreboard extends Component {
  loaded = this.loaded.bind(this)

  loaded() {
    const user_loaded = !!this.props.user.username
    return user_loaded
  }

  componentWillMount() {
    this.props.getScores()
  }

  render () {
    return (
     this.loaded() ? (
        <div className="Scoreboard">
          <table>
            <tbody>
              <tr>
                <td className="no-bottom six columns">
                  <div className="UserScore">
                    <h2>{this.props.user.zombie ? "Zombie" : "Human"} {this.props.user.username}</h2>
                    <table>
                      <tbody>
                        <tr>
                          <th id="human" className="no-bottom">Days Survived:<br />{this.props.user.days_survived}</th>
                          <th id="zombie" className="no-bottom">Humans Infected:<br />{this.props.user.humans_infected}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td className="no-bottom six columns">
                  <PieChart count={this.props.scores.count}/>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className="Leaderboard">
            <table>
              <tbody>
                <tr>
                  <td className="no-bottom six columns"><Leaderboard data={this.props.scores.human}/></td>
                  <td className="no-bottom six columns"><Leaderboard data={this.props.scores.zombie}/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getScores
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
