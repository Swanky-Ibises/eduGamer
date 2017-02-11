import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default class GameSimon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      simon: this.generateSimon(),
      colors: [],
      color: 'black',
      lose: false,
      key: -1,
      playerTurn: false,
      level: 1,
      levelCheck: 0
    };
  }

  componentDidMount() {
    var that = this;
    this.setState({
      colors: this.generateColors()});
    setTimeout(function() {that.playSimon();}, 500);
  }
  //Play game
  playSimon() {
    console.log('lets play');
    var that = this;
    //Don't allow button press until Simon has showed combo
    that.setState({playerTurn: false});
    for(var i = 0; i < that.state.level; i++){
      (function(index) {
        //time out after adding to the level
        setTimeout(function() {
          that.setState(
          {key: that.state.simon[index]},
          function() { that.setState({
            level: that.state.level + 1})});}, i * 500);
    })(i);
     } //Reset check game to start checking again
     setTimeout(function() { that.checkGame(); },
                that.state.level * 500 + 100);
  }

  checkGame() {
    this.setState({levelCheck: 0, playerTurn: true});
  }

  checkKey(key) {
    if(this.state.playerTurn){
      console.log('input', key);
      key === this.state.simon[this.state.levelCheck] ?
      this.levelCorrect() :
      this.levelIncorrect();
    }
  }

  levelCorrect() {
    var that = this;
    this.setState({levelCheck: this.state.levelCheck + 1}, function() {
      if(this.state.levelCheck === this.state.level) {
        this.setState({score: this.state.score + 1});
        this.setState({level: this.state.level + 1}, function() {
          setTimeout(function() {
            that.playSimon();
          }, 1000);
        })
      }
    })
  }

  levelIncorrect() {
    this.setState({playerTurn:false, lose: true});
    //this.saveScore();
    console.log('save score goes here');
  }

  //Adds to Simon array
  generateSimon() {
    var order = [];
    for (var i = 0; i < 10; i++) {
      var num = Math.round(Math.random()*3);
      order.push(num);
    }
    console.log('simon is', order);
    return order;
  }

  generateColors() {
    var colors = [];
    var simon = this.state.simon;
    for (var i = 0; i < simon.length; i++){
      if(simon[i] === 0) {
        colors.push('black');
        colors.push('red');
      } else if (simon[i] === 1) {
        colors.push('black');
        colors.push('violet');
      } else if (simon[i] === 2) {
        colors.push('black');
        colors.push('green');
      } else if (simon[i] === 3) {
        colors.push('black');
        colors.push('yellow');
      }
    }
    console.log('colors are', colors);
    return colors;
  }
  //Not re-rendering color, probably sync issue
  // simonColor(num) {
  //   if(num === 0) {
  //     return 'red';
  //   } else if (num === 1) {
  //     return 'violet';
  //   } else if (num === 2) {
  //     return 'green';
  //   } else if (num === 3) {
  //     return 'yellow';
  //   } else {
  //     return 'black';
  //   }
  // }
  // simonColor(num){
  //   setTimeout(()=>{
  //     if(num === 0) {
  //       this.color = 'red';
  //       this.setState({color: 'red'});
  //       //return 'red';
  //     } else if (num === 1) {
  //       this.color = 'violet';
  //       //return 'violet';
  //       this.setState({color: 'violet'});
  //     } else if (num === 2) {
  //       this.color = 'green';
  //       //return 'green';
  //       this.setState({color: 'green'});
  //     } else if (num === 3) {
  //       this.color = 'yellow';
  //       //return 'yellow';
  //       this.setState({color: 'yellow'});
  //     }
  //     console.log('num is', num);
  //   }, 500);
  //     setTimeout(()=>{
  //       this.color = 'black';
  //       this.setState({color: 'black'})
  //     }, 400);
  // }

  handleButton(value) {
    this.checkKey(value);
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
        <h3>Sorry! This game isn't quite functioning at the moment. Check back later.</h3>
        <h3>Score: { this.state.score }</h3>
        <div className='simonSays'>
        <Grid padded>
          <Grid.Row>
          <Grid.Column width={6}/>
          <Grid.Column width={4} color={this.state.color}/>
          {this.state.color}
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
