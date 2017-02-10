import React from 'react';
import { Header, Message, Button } from 'semantic-ui-react';

export default class MemorizeTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timeLeft: 10,
      locked: false,
      gameBoard: [[0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0]]
    };
  }

  componentWillMount() {
    this.generateGameBoard();
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
        <Button>Start Game</Button>
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
        <br />
        <Button>Submit</Button>
      </Message>
    );
  }
}