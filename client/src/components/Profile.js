import React from 'react';
import $ from 'jquery';
import {Header, Table} from 'semantic-ui-react';

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      highScoreMem: null,
      highScoreScram: null,
      memScores: [],
      scramScores: []
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    //hard code a username for now - can get the username from local.storage (or state, for persistence to work)
    //send a Get request to get the user info
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/' + localStorage.username,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect === 'string') {
          console.log('redirect to login!');
          // localStorage.username = null;
          localStorage.removeItem('username');
          window.location = data.redirect;
        }
        //retrieve data and setState
        context.setState({
          username: data.username,
          highScoreMem: data.highScoreMem,
          highScoreScram: data.highScoreScram,
          memScores: data.memScores,
          scramScores: data.scramScores
        });
      }
    });
  }


  scoreDisplay () {
    //---- Element for displaying one game ----
    var OneGameScoreDisplay = ({gameType, score, scoreArr})=>(
      <div className="game-profile">
        <h2>Highest {gameType} Game Score: <span className="highscore">{score}</span></h2>
        <div className="score-table">
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell> # </Table.HeaderCell>
                  {scoreArr.map((eachScore, ind)=>{
                      return <Table.HeaderCell key={ind}> {ind + 1} </Table.HeaderCell>;
                    })
                  }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell> Score </Table.Cell>
                  {scoreArr.map((eachScore, ind)=>{
                    return <Table.Cell key={ind}> {eachScore} </Table.Cell>;
                  })
                }
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    );

    //---- Logics for displaying game elem -----------------------
    //--- Potentially refactor for the games to reside in one array for easy data manipulation
    let gameDisplay = [];
    if (this.state.memScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Memory' score={this.state.highScoreMem} scoreArr={this.state.memScores} key='Memory' />);

    }
    if (this.state.scramScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Scramble' score={this.state.highScoreScram} scoreArr={this.state.scramScores} key='Scramble' />);
    }
    //----- Return the completed score element -------
    return (
      <div>
        {gameDisplay}
      </div>
    );
  }


  displayProfile() {
    //-------constructing profile elements -------
    let profileElem;
    const NoScoreDisplay = (
      <h2>No Game Score</h2>
    );
    //--------------------------------------------

    //the logics to decide what elements to display
    //localStorage only stores strings
    //do a username check to avoid going into the next if statement causing error
    if (!localStorage.username) {
      console.log('no localStorage username');
      return;
    } else if (this.state.scramScores.length === 0 && this.state.memScores.length === 0) {
      profileElem = (NoScoreDisplay);
    } else {
      profileElem = ( this.scoreDisplay());
    }
    return profileElem;
  }

  render() {
    var name = (localStorage.username) ? localStorage.username.toUpperCase() + "'s Profile" : '';

    return (
      <div>
        <h1>{name}</h1>
            {this.displayProfile()}
      </div>
    );
  }
}
