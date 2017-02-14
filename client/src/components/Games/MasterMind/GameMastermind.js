//Based on http://zofiakorcz.pl/mastermind-react-es6-webpack
import React from 'react';
import classNames from 'classnames';
import $ from 'jquery';
import {Grid, Message} from 'semantic-ui-react'
import DecodingBoard from './DecodingBoard.js';
import CodePegs from './CodePegs.js';
import EndGame from './End_Game.js';

//Creates main components of the game
export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.codeLength = 4;
    this.colors = new Map([[0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five']]);
    this.state = {
      code: this.generateCode(),
      selectedPeg: this.colors.get(0),
      currentRow: 0,
      currentGuess: new Map(),
      exactMatches: 0,
      valueMatches: 0,
      pegsInRow: 4,
      attempts: 10,
      success: false,
      endGame: false
    }
  }

  //Do some function, f, n times
  times(n) {
    return (f) => {
      Array(n).fill().map((_, i) => f(i));
    }
  }
  //Generate the code
  generateCode() {
    var code = new Map();
    var random = () => { return Math.floor(Math.random() * 6)};
    var genCode = (i) => {
      code.set(i, this.colors.get(random()));
    }
    //Generate 4 colors
    this.times(this.codeLength)(genCode);
    return code;
  }

  //Activate the peg by click
  activatePeg(event) {
    if (event.target.name.startsWith('peg')) {
      this.setState({selectedPeg: event.target.value});
    } else {
      if (this.state.selectedPeg) {
        this.setState({currentGuess: this.state.currentGuess.set(event.target.value - 1, this.state.selectedPeg)});
      }
    }
  }

  //Sends the four pegs for decoding
  submitPegs() {
    var code = new Map(this.state.code);
    var pegs = this.state.currentGuess;
    var foundKey;
    var exactMatches = 0;
    var valueMatches = 0;

    var keyOf = (map, target) => {
      //ES6 is interesting, refactor later to match the rest which is mostly in ES5
      for(let[key, value] of map) {
        if (target === value) {
          return key;
        }
      }
      return -1;
    }
    //Look for value and position matches, remove if match
    for (let[key, value] of pegs) {
      if (value === code.get(key)) {
        exactMatches++;
        pegs.delete(key);
        code.delete(key);
      }
    }

    //Look for value match
    for (let[key, value] of pegs) {
      foundKey = keyOf(code, value);
      if (foundKey !== -1) {
        valueMatches++;
        code.delete(foundKey);
      }
    }

    //Look for exact match
    if (exactMatches === this.state.pegsInRow) {
      this.setState({
        endGame: true,
        success: true});
    } else if (this.state.attempts === this.state.currentRow + 1) {
      this.setState({endGame: true});
    }

    this.setState({
      exactMatches: exactMatches,
      valueMatches: valueMatches,
      currentRow: this.state.currentRow + 1,
      currentGuess: new Map()
    });

  }
  //Reset the states to reload the game
  reloadGame() {
    this.setState({
      success: false,
      endGame: false,
      code: this.generateCode(),
      selectedPeg: this.colors.get(0),
      currentRow: 0,
      currentGuess: new Map(),
      exactMatches: 0,
      valueMatches: 0
    });
  }

  render() {
    return (
      <div className="mastermindGame">
        <Message>
          <h2> Mastermind </h2>
          Decoding game. Try and guess the pattern! Black dot means a guess is correct in color and position. White dot means right color but wrong position. You have ten turns. Choose a color on the right and click on the circles on the decoding board to fill them in.
          <br />
          <br />
          <div className="clearfix">
            <DecodingBoard state={this.state} activatePeg={this.activatePeg.bind(this)} submitPegs={this.submitPegs.bind(this)}/>
            <CodePegs selectedPeg={this.state.selectedPeg} colors={this.colors} activatePeg={this.activatePeg.bind(this)}/>
          </div>
          <EndGame endGame={this.state.endGame} success={this.state.success} reloadGame={this.reloadGame.bind(this)} turns={this.state.currentRow}/>
        </Message>
      </div>
      )
  }
}
