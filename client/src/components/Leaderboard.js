import React from 'react';
import LeaderboardTable from './GameLeaderboard.js'
import {Header, Table} from 'semantic-ui-react'
import $ from 'jquery'

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.games = ['scramble', 'matching', 'typing', 'simon'];
    this.state = {
      scrambleLeaders:[],
      matchingLeaders:[],
      typingLeaders:[],
      simonLeaders: []
    }
  }

  componentDidMount() {
    var context = this;
    for(var i = 0; i < this.games.length; i++){
      var currentGame = this.games[i];
      this.getGameLeaders(currentGame);
    }
  }

  getGameLeaders (gameName) {
    var context = this;
    var gameLeaders = gameName + 'Leaders';
    console.log("GAME NAME", gameName);
    $.ajax({
      type: 'GET',
      url: '/api/v2/leaderboard/'+ gameName,
      contentType: 'application/json',
      success: function(leaders) {
        console.log("leaders", leaders);
        console.log("game leaders", gameLeaders);
        var stateObj = {};
        stateObj[gameLeaders] = leaders;
        context.setState(stateObj);
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Scramble Top Scores</h2>
        <LeaderboardTable leaders={this.state.scrambleLeaders} />
        <h2>Matching Top Scores</h2>
        <LeaderboardTable leaders={this.state.matchingLeaders} />
        <h2>Typing Top Scores</h2>
        <LeaderboardTable leaders={this.state.typingLeaders} />
        <h2>Simon Top Scores</h2>
        <LeaderboardTable leaders={this.state.simonLeaders} />
      </div>
    )
  }
};