import React from 'react';
import { Header, Message, Button } from 'semantic-ui-react';

export default class MemorizeTiles extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.fullRoundTimer = null;
    this.state = {
      gameStarted: false,
      sessionTimer: 120,
      score: 0,
      timeLeft: 0,
      startedTimer: false,
      playerPlaying: false,
      incorrect: false,
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

  componentDidMount() {
    this.roundTimer();
  }

  roundTimer() {
    var context = this;
    this.fullRoundTimer = setInterval(() => {
      if (context.state.sessionTimer > 0) {
        context.setState({sessionTimer: context.state.sessionTimer - 1});
      } else {

        $.ajax({
          type:'POST',
          url: '/api/v2/user/score',
          data: JSON.stringify({username: localStorage.username, gametype: 'tiles', score: context.state.score}),
          contentType: 'application/json',
          success: function(response) {
            console.log('Tiles scored posted');
          }
        });
        context.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.fullRoundTimer);
  }

  componentWillMount() {
    this.resetTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.fullRoundTimer);
  }

  resetTimer() {
    this.setState({
      timeLeft: 10,
      startedTimer: false
    });
    clearInterval(this.timer);
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
    this.setState({
      startedTimer: true,
      incorrect: false
    });
    this.timerStart();
  }

  timerStart() {
    var context = this;
    this.timer = setInterval(() => {
      if (context.state.timeLeft > 0) {
        context.setState({timeLeft: context.state.timeLeft - 1});
      } else {
        clearInterval(this.timer);
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
    var board = this.state.playerBoard.slice();
    board[rowIndex][tileIndex] === 0 ? board[rowIndex][tileIndex] = 1 : board[rowIndex][tileIndex] = 0;
    this.setState({
      playerPlaying: true,
      playerBoard: board
    });
  }

  submitBoard() {
    // Slow but easy way to compare arrays
    if (JSON.stringify(this.state.gameBoard) === JSON.stringify(this.state.playerBoard)) {
      this.setState({score: this.state.score + 1});
    } else {
      this.setState({incorrect: true});
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
    return (
      <div className="gameContainer">
      <Message>
        <Header size='huge'>Memorize Tiles</Header>
        <br />
        <Header size='medium'>{this.state.sessionTimer}</Header>
        <br />
        <Header size='medium'>Score: <span className='memorize-tile-score'>{this.state.score}</span></Header>

        {this.state.playerPlaying && <Header size='medium'><br />Select the boxes you just saw...</Header>}

        <br />

        <Button disabled={this.state.startedTimer || this.state.playerPlaying} onClick={this.startGame.bind(this)}>{!this.state.gameStarted ? 'Start Game' : 'Next round'}</Button>

        <br />

        {!this.state.playerPlaying && this.state.startedTimer && <Header size='medium'><br />Time left: {this.state.timeLeft} seconds<br /></Header>}

        {this.state.incorrect && <Header size='medium'><br />Sorry! The correct answer was:<br /></Header>}

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
      </div>
    );
  }
}
