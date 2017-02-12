//build table for a game
import React from 'react'
import {Header, Table} from 'semantic-ui-react'

const LeaderboardTable = (props) => {
  let gameHigh = props.game+"High";
  return (
    <div>
      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="leaderboardHeader">{props.game.charAt(0).toUpperCase() + props.game.slice(1) + " Top Scores"}</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell><span>User</span></Table.HeaderCell>
            <Table.HeaderCell><span>Score</span></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{props.leaders.map(function(leader, i){
          return (
            <Table.Row key={i}>
              <Table.Cell>{leader.username}</Table.Cell>
              <Table.Cell>{leader[gameHigh]}</Table.Cell>
            </Table.Row>
            )
          })
        }
        </Table.Body>
      </Table>
    </div>
  )
}

export default LeaderboardTable