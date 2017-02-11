import React from 'react';
import $ from 'jquery';
import {Header, Table, Message} from 'semantic-ui-react';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      highScoreMem: null,
      highScoreScram: null,
      highScoreSimon: null,
      highScoreTiles: null,
      highScoreMastermind: null,
      highScoreTyping: null,
      memScores: [],
      scramScores: [],
      simonScores: [],
      tilesScores: [],
      mastermindScores: [],
      typingScores: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount Profile');
    this.getUserInfo();
  }

  getUserInfo() {
    console.log('Get user info');
    //hard code a username for now - can get the username from local.storage (or state, for persistence to work)
    //send a Get request to get the user info
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/' + localStorage.username,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        console.log("THA DATA", data);
        if (typeof data.redirect === 'string') {
          console.log('redirect to login!');
          // localStorage.username = null;
          localStorage.removeItem('username');
          window.location = data.redirect;
        }
        //retrieve data and setState
        context.setState({
          username: data.username,
          highScoreMem: data.memoryHigh,
          highScoreScram: data.scrambleHigh,
          highScoreSimon: data.simonHigh,
          highScoreTiles: data.tilesHigh,
          highScoreMastermind: data.mastermindHigh,
          highScoreTyping: data.typingHigh,
          memScores: data.matchingArray,
          scramScores: data.scrambleArray,
          simonScores: data.simonArray,
          tilesScores: data.tilesArray,
          mastermindScores: data.mastermindArray,
          typingScores: data.typingArray
        });
      }
    });
  }


  scoreDisplay () {
    //---- Element for displaying one game ----
    var OneGameScoreDisplay = ({gameType, score, scoreArr})=>(
      <div className="game-profile">
        <h3>Highest {gameType} Game Score: <span className="highscore">{score}</span></h3>
        <div className="score-table">
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>  </Table.HeaderCell>
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
    if (this.state.simonScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Simon' score={this.state.highScoreSimon} scoreArr={this.state.simonScores} key='Simon' />);

    }
    if (this.state.tilesScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Tiles' score={this.state.highScoreTiles} scoreArr={this.state.tilesScores} key='Tiles' />);
    }
    // if (this.state.mastermindScores.length !== 0) {
    //   gameDisplay.push(<OneGameScoreDisplay gameType='Mastermind' score={this.state.highScoreMastermind} scoreArr={this.state.mastermindScores} key='Mastermind' />);
    // }
    if (this.state.typingScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Typing' score={this.state.highScoreTyping} scoreArr={this.state.typingScores} key='Typing' />);
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
    console.log("STATE", this.state);
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
    var name = localStorage.username ? localStorage.username + "'s Profile" : '';

    return (
      <Message>
        <h1>{name}</h1>
            {this.displayProfile()}
      </Message>
    );
  }
}
