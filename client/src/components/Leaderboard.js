import React from 'react';
import LeaderboardTable from './GameLeaderboard.js'
import {Header, Table, Divider} from 'semantic-ui-react'
import $ from 'jquery'

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.games = ['scramble', 'matching', 'typing', 'simon', 'tiles', 'mastermind'];
    this.state = {
      scrambleLeaders:[],
      matchingLeaders:[],
      typingLeaders:[],
      simonLeaders: [],
      tilesLeaders: [],
      mastermindLeaders: []
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

      <div className="leaderboard-container">
        <h2>Global Leaderboard</h2>
        <br />
        <Divider />
        <br />
        <br />
        <LeaderboardTable leaders={this.state.scrambleLeaders} game='scramble' />
        <br />
        <LeaderboardTable leaders={this.state.typingLeaders} game='typing' />
        <br />
        <LeaderboardTable leaders={this.state.matchingLeaders} game='matching' />
        <br />
        <LeaderboardTable leaders={this.state.tilesLeaders} game='tiles' />
        <br />
        <LeaderboardTable leaders={this.state.simonLeaders} game='simon' />
        <br />
        <LeaderboardTable leaders={this.state.mastermindLeaders} game='mastermind' />

      </div>
    )
  }
};