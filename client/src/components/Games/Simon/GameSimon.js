import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default class GameSimon extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      score: 0,
      simon: this.generateSimon(),
      colors: [],
      color: 'black',
      lose: false,
      playerTurn: false,
      input: [],
      level: 1,
      timer: 0,
    };
  }

  componentDidMount() {
    //Generate the colors array
    this.setState({
      colors: this.generateColors()}
      );
    //Start timer
    this.simonTimer();
  }

  componentWillMount() {
    this.resetTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //reset timer
  resetTimer() {
    this.setState({timer: 0});
    clearInterval(this.timer);
  }

  simonTimer() {
    var that = this;
    //Function called every 500 ms
    this.timer = setInterval(()=>{
      //Check if done showing colors
      if(that.state.timer > that.state.level * 2) {
        //Clear timer
        clearInterval(that.timer);
        that.resetTimer();
        //Start player turn
        that.setState({playerTurn: true});
      } else {
          if (that.state.timer % 2 === 0) {
            that.setState({color: 'black',
              timer: that.state.timer + 1});
        } else {
            that.setState({color: that.state.colors[Math.floor(that.state.timer/2)], timer: that.state.timer + 1});
        }
      }
    }, 500);
  }

  generateSimon() {
    var order = [];
    for (var i = 0; i < 50; i++) {
      var num = Math.round(Math.random()*3);
      order.push(num);
    }
    return order;
  }

  generateColors() {
    var colors = [];
    var simon = this.state.simon;
    for (var i = 0; i < simon.length; i++){
      if(simon[i] === 0) {
        colors.push('red');
      } else if (simon[i] === 1) {
        colors.push('violet');
      } else if (simon[i] === 2) {
        colors.push('green');
      } else if (simon[i] === 3) {
        colors.push('yellow');
      }
    }
    return colors;
  }
  //Check inputs
  checkKey(value) {
    if(this.state.playerTurn){
      var inputs = this.state.input;
      inputs.push(value);
      this.setState({input: inputs});
      //Check for incorrect input
      for(var i = 0; i < inputs.length; i++) {
        if(this.state.simon[i] !== this.state.input[i]) {
          this.setState({lose: true,
            playerTurn: false});
          //Send score here
          console.log('You lose. Send score.');
        }
      }
      if (inputs.length === this.state.level) {
        //Increase score and level, clear input and prevent any inputs
        this.setState({
          score: this.state.score + 1,
          input: [],
          level: this.state.level + 1,
          playerTurn: false
        });
        //Start next round
        this.simonTimer();
      }
    }
  }

  //After the game is ended, this method makes an AJAX post request to the server
  saveScore() {
    console.log('score is being saved');
    //post the score to the backend if user is logged in
    if (localStorage.username) {
      console.log('scramble game username', localStorage.username);
      var obj = {
        username: localStorage.username,
        gametype: this.gametype,
        score: this.state.score
      };
      $.ajax({
        type: 'POST',
        url: '/scores',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function(data) {
          console.log('Data posted to server', data);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Simon</h2>
        <h3>Score: { this.state.score }</h3>
        <div className='simonSays'>
        <Grid padded>
          <Grid.Row>
          <Grid.Column width={6}/>
          <Grid.Column width={4} color={this.state.color}/>
          </Grid.Row>
          <Grid.Row/>
        </Grid>
        </div>
        <div className='simonButtons'>
        <Button color = 'red' size = 'massive' key = {0} onClick={()=>this.checkKey(0)} disabled={this.state.lose || !this.state.playerTurn}/>
        <Button color = 'violet' size = 'massive' key = {1} onClick={()=>this.checkKey(1)} disabled={this.state.lose || !this.state.playerTurn}/>
        <Button color = 'green' size = 'massive' key = {2} onClick={()=>this.checkKey(2)} disabled={this.state.lose || !this.state.playerTurn}/>
        <Button color = 'yellow' size = 'massive' key = {3}  onClick={()=>this.checkKey(3)} disabled={this.state.lose || !this.state.playerTurn}/>
        </div>
        <br/>
        {this.state.lose && <Button onClick={()=>window.location.reload()}>Try Again</Button>}
      </div>
    );
  }
}
