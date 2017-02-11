//Based on http://zofiakorcz.pl/mastermind-react-es6-webpack
import React from 'react';
import classNames from 'classnames';
import $ from 'jquery';
import {Grid} from 'semantic-ui-react'
import DecodingBoard from './DecodingBoard.js';
import CodePegs from './CodePegs.js';

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
      rules: false,
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

  generateCode() {
    var code = new Map();
    var random = () => { return Math.floor(Math.random() * 6)};
    var genCode = (i) => {
      code.set(i, this.colors.get(random()));
    }
    //Generate 4 colors
    this.times(this.codeLength)(genCode);
    console.log('code is', code);
    return code;
  }

  activatePeg(event) {
    if (event.target.name.startsWith('peg')) {
      this.setState({selectedPeg: event.target.value});
    } else {
      if (this.state.selectedPeg) {
        this.setState({currentGuess: this.state.currentGuess.set(event.target.value - 1, this.state.selectedPeg)});
      }
    }
  }



  submitPegs() {
    var code = new Map(this.state.code);
    var pegs = this.state.currentGuess;
    var foundKey;
    var exactMatches = 0;
    var valueMatches = 0;

    var keyOf = (map, target) => {
      //ES6 is interesting, refactor later to match the rest which is mostly in ES5
      //Or refactor everything into ES6 instead of having bits and pieces
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

  render() {
    return (
      <div className="mastermindGame">
      <h2> Mastermind </h2>
      Decoding game. Try and guess the pattern! Black dot means a guess is correct in color and position. White dot means right color but wrong position.
      <br />
      <Grid>
        <Grid.Row>
          <Grid.Column width={13}>
          <Grid>
            <Grid.Column width={10}>
              <DecodingBoard state={this.state} activatePeg={this.activatePeg} submitPegs={this.submitPegs}/>
            </Grid.Column>
            <Grid.Column width={1}>
            Submit button
            </Grid.Column>
            <Grid.Column width={2}>
            Hints go here
            </Grid.Column>
          </Grid>
          </Grid.Column>
          <Grid.Column width={2}>
          <CodePegs selectedPeg={this.state.selectedPeg} colors={this.colors} activatePeg={this.activatePeg}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
      )
  }
}
