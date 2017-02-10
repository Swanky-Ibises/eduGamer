import React from 'react';
import { Header, Message, Button } from 'semantic-ui-react';

export default class MemorizeTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      score: 0,
      timeLeft: 0,
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

  componentWillMount() {
    this.resetTimer();
  }

  resetTimer() {
    this.setState({
      timeLeft: 10,
      startedTimer: false
    });
  }

  resetPlayerBoard() {
    this.setState({
      playerBoard: [[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]]
    })
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
        context.resetTimer();
        context.setupPlayerBoard();
      }
    }, 1000);
  }

  setupPlayerBoard() {
    this.setState({
      gameStarted: true,
      playerPlaying: true
    });
  }

  clickTile(rowIndex, tileIndex) {
    console.log(rowIndex, tileIndex);
    var board = this.state.playerBoard.slice();
    board[rowIndex][tileIndex] === 0 ? board[rowIndex][tileIndex] = 1 : board[rowIndex][tileIndex] = 0;
    console.log(board[rowIndex][tileIndex]);
    this.setState({
      playerPlaying: true,
      playerBoard: board
    });
  }

  submitBoard() {
    // Slow but easy way to compare arrays
    if (JSON.stringify(this.state.gameBoard) === JSON.stringify(this.state.playerBoard)) {
      this.setState({score: this.state.score + 1});
    }
    this.setState({
      playerPlaying: false,
    })
    this.resetPlayerBoard();
    this.resetTimer();
  }

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
        {!this.state.playerPlaying && this.state.startedTimer && <Header size='medium'>Time left: {this.state.timeLeft} seconds</Header>}

        {this.state.playerPlaying && <Header size='medium'>Select the boxes you just saw...</Header>}
        <br />

        <Button disabled={this.state.startedTimer || this.state.playerPlaying} onClick={this.startGame.bind(this)}>{!this.state.gameStarted ? 'Start Game' : 'Next round'}</Button>

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
                  <div className={tile === 1 ? 'memorize-tile tile-red' : 'memorize-tile tile-white'} key={tileIndex} onClick={this.clickTile.bind(this, rowIndex, tileIndex)}></div>
                ))}
              </div>
            ))}
          </div>)
        }
        <br />
        <Button disabled={!this.state.playerPlaying} onClick={this.submitBoard.bind(this)}>Submit</Button>
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
