import React from 'react';
import { Header, Message, Button } from 'semantic-ui-react';

export default class MemorizeTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timeLeft: 5,
      startedTimer: false,
      playerPlaying: false,
      gameBoard: [[0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0]],
      playerBoard: [[0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0]]
    };
  }

  startGame() {
    this.generateGameBoard();
    this.setState({startedTimer: true});
    this.timerStart();
  }

  timerStart() {
    var context = this;
    var timer = setInterval(() => {
      if (context.state.timeLeft > 0) {
        context.setState({timeLeft: context.state.timeLeft - 1});
      } else {
        clearInterval(timer);
        context.setupPlayerBoard();
      }
    }, 1000);
  }

  setupPlayerBoard() {
    this.setState({playerPlaying: true});
  }

  submitBoard() {}

  generateGameBoard() {
    var zeroOrOne = function() {
      return Math.round(Math.random());
    };
    var gameBoard = this.state.gameBoard;
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        row[tileIndex] = zeroOrOne();
      });
    });
    this.setState({gameBoard});
  }

  render() {
    console.log('Rendering gameBoard:');
    console.table(this.state.gameBoard);
    return (
      <Message>
        <Header size='huge'>Memorize Tiles</Header>
        <br />
        <Header size='medium'>Score: {this.state.score}</Header>
        <br />
        <Header size='medium'>Time left: {this.state.timeLeft} seconds</Header>
        <Header size='medium'>Select the boxes you just saw...</Header>
        <br />
        <Button disabled={this.state.startedTimer} onClick={this.startGame.bind(this)}>Start Game</Button>
        {!this.state.playerPlaying ?
          (<div className='memorize-tile-game'>
            {this.state.gameBoard.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((tile, tileIndex) => (
                  <div className={tile === 1 ? 'memorize-tile tile-red' : 'memorize-tile tile-white'} key={tileIndex}></div>
                ))}
              </div>
            ))}
          </div>) :
          (<div className='memorize-tile-game'>
            {this.state.playerBoard.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((tile, tileIndex) => (
                  <div className={tile === 1 ? 'memorize-tile tile-red' : 'memorize-tile tile-white'} key={tileIndex}></div>
                ))}
              </div>
            ))}
          </div>)
        }
        <br />
        <Button disabled={!this.state.playerPlaying}>Submit</Button>
      </Message>
    );
  }
}

/*
Mock code
<div className='memorize-tile-game'>
  <div>
    <div className='memorize-tile tile-white'></div>
    <div className='memorize-tile tile-white'></div>
    <div className='memorize-tile tile-white'></div>
    <div className='memorize-tile tile-red'></div>
  </div>
  <div>
    <div className='memorize-tile tile-red'></div>
    <div className='memorize-tile tile-red'></div>
    <div className='memorize-tile tile-white'></div>
    <div className='memorize-tile tile-white'></div>
  </div>
  <div>
    <div className='memorize-tile tile-red'></div>
    <div className='memorize-tile tile-white'></div>
    <div className='memorize-tile tile-white'></div>
    <div className='memorize-tile tile-red'></div>
  </div>
  <div>
    <div className='memorize-tile tile-red'></div>
    <div className='memorize-tile tile-red'></div>
    <div className='memorize-tile tile-red'></div>
    <div className='memorize-tile tile-red'></div>
  </div>
</div>
*/
