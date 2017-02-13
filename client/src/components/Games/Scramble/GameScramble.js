import React from 'react';
import { data }  from './Data.js';
import { Timer } from './Timer.js';
import { Score } from './Score.js';
import { Button, Input, Message, Form, Grid, Container } from 'semantic-ui-react';
import $ from 'jquery';

export default class GameScramble extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'scramble';
    this.state = {
      userInput: '',
      word: null,
      definition: null,
      shuffled: null,
      score: 0,
      timeLeft: 45,
      done: false
    };
  }

  reload() {
    window.location.reload();
  }
  //This method shuffles the string passed in
  shuffle(string) {
    var characters = string.split('');
    var length = characters.length;
    for (var i = length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = characters[i];
      characters[i] = characters[j];
      characters[j] = temp;
    }
    var result = characters.join('');
    if (result === string) {
      result = this.shuffle(string);
    }
    return result;
  }


  //This method changes this.state.word
  changeWord() {
    var rng = Math.ceil(Math.random()*999);
    var wordData = data[rng];
    var newWord = Object.keys(wordData)[0].toUpperCase();
    this.setState({
      word: newWord,
      definition: wordData[newWord.toLowerCase()],
      shuffled: this.shuffle(newWord)
    });
  }

  //This method changes the state based on the text input
  changeInput(text) {
    console.log('the word in change input is ', this.state.word);
    this.setState({userInput: text.target.value});
    if (text.target.value.toUpperCase() === this.state.word) {
      this.changeWord();
      this.setState({userInput: ''});
      this.setState({score: this.state.score + 1});
      text.target.value = '';
    }
  }


  //This method skips the word and changes the word to the next
  skipWord(e) {
    e.preventDefault();
    this.setState({score: this.state.score - 1});
    this.changeWord();
  }


  //This method decrements the timer by 1 second
  decrementTimer() {
    this.setState({timeLeft: this.state.timeLeft - 1});
    if (this.state.timeLeft <= 0) {
      console.log('timer stopped');
      this.saveScore();
      this.setState({done: true});
      clearInterval(this.interval);
    }
  }


  //When component mounts, the timer starts and the state word will be shuffled
  componentDidMount() {
    this.interval = setInterval(this.decrementTimer.bind(this), 1000);
    console.log("Close this console now. Don't cheat! Or... keep it up if you're really curious about the word.");
    this.changeWord();
  }

  //On dismount, the timer will stop.
  componentWillUnmount() {
    clearInterval(this.interval);
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
      <Grid>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={8}>
        <Message>
          <h2>Scramble</h2>
          <Score score={this.state.score}/>
          <h4> Unscramble as many words as you can before time runs out! Skip if you can't figure it out.</h4>
          <Timer time={this.state.timeLeft} />
          <h1> {this.state.shuffled} </h1>
          <h4> {this.state.definition} </h4>
          <Input className='scramble-input' placeholder="Enter Word" onChange={this.changeInput.bind(this)} disabled={this.state.done}/>
          <Button onClick={this.skipWord.bind(this)} disabled={this.state.done}>Skip</Button>
          <br />
          {this.state.done && <Button onClick={this.reload.bind(this)}>Try Again</Button>}
          <br />
          <br />
          <h7 className = 'note'> These words are "difficult but common words that appear in everyday academic and business writing" (Vocabulary.com).</h7>
        </Message>
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid>
    );
  }
}
