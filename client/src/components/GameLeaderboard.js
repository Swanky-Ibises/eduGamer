//build table for a game
import React from 'react'
import {Header, Table} from 'semantic-ui-react'

const LeaderboardTable = (props) => {
  return (
    // <h2>{props.gameType}</h2>
    <Table basic='very' celled collapsing>
      <Table.Body> {
        props.leaders.map(function(leader, i){
          return ( <Table.Row>
                    <Table.Cell>
                      {leader.username}
                    </Table.Cell>
                    <Table.Cell>
                      {leader.scrambleHigh}
                    </Table.Cell>
                   </Table.Row>
                 )
        })
      }
      </Table.Body>
    </Table>


  )
  //display game title in header - figure out how to get game title from API
    //each row has two cells: | username | score | - figure out how to render each user into a row and render each username into first cell, and highscore for given game in score
}

export default LeaderboardTable