//build table for a game
import React from 'react'
import {Header, Table} from 'semantic-ui-react'

//Creates leaderboard table for given game
const LeaderboardTable = (props) => {
  let gameHigh = props.game+"High";
  return (
    <div className='leaderboard-table'>
      <h4>{props.game.charAt(0).toUpperCase() + props.game.slice(1)} Top Scores</h4>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><span>User</span></Table.HeaderCell>
            <Table.HeaderCell><span>Score</span></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {props.leaders.map(function(leader, i) {
          return (
            <Table.Row key={i}>
              <Table.Cell>{leader.username}</Table.Cell>
              <Table.Cell>{leader[gameHigh] ? leader[gameHigh] : '0'}</Table.Cell>
            </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default LeaderboardTable