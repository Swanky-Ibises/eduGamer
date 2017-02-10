import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import $ from 'jquery';
import {sudoku} from '../vendor/sudoku.js';
import SudokuCell from './SudokuCell.js';

export default class GameSudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: sudoku.generate(),
      cells: {},
      errored: []
    };
  }
  //Create the board when starting
  componentDidMount() {
    this.createBoard();
  }
  //Create the board with placeholders
  createBoard() {
    var generatedBoard = this.state.board;
    var board = {};
    for (var i = 65; i <= 73; i++) {
      var quadrant = String.fromCharCode(i);
      for (var j = 1; j <= 9; j++) {
        var cell = quadrant + '' + j;
        if (generatedBoard[cell] !== undefined) {
          board[cell] = {};
          board[cell] = generatedBoard[cell];
        } else {
          board[cell] = '';
        }
      }
    }
    //Cells is an object with each cell of the board as a key
    this.setState({
      cells: board
    });
    return board;
  }

  //Puts the cells in array of row arrays
  arrayCells() {
    var cells = Object.keys(this.state.cells);
    var arrayCell = [];
    var i;
    var j;
    for (i = 0, j = cells.length; i < j; i += 9) {
      arrayCell.push(cells.slice(i, i + 9));
    }
    return arrayCell;
  }
  //Updates the cell
  updateCell(cellIndex, value) {
    var cells = this.state.cells;
    var keys = Object.keys(cells);

    cells[keys[cellIndex]] = value;
    this.setState({
      cells: cells,
      errored: []
    });
  }
  //Check puzzle
  checkPuzzle() {
    var that=this;
    var conflicts = sudoku.getConflicts(that.state.cells);
    var erroredFields = [];

    if (!conflicts.length > 0) {
      return true;
    }

    //Check for conflicts
    conflicts.forEach(function(value, key) {
      value.errorFields.forEach(function(v, k) {
        erroredFields.push(v);
      });
    });

    var erroredQuadrant = conflicts[0].unit;

    that.setState({
      errored: erroredFields
    });
  }
  //Reload the page
  resetPuzzle() {
    window.location.reload();
  }

  render(){
    var that = this;
    var cells = this.arrayCells();
    var cellsIndexed = Object.keys(this.state.cells);
    var cellIndex = -1;

    return (
      <div className = 'sudokuBoard'>
      <h1> Sudoku </h1>
      <h3> No high scores. Just Sudoku. Press 'Check' to check for conflicts. If you fill the whole board with no conflicts, you win!</h3>
      <Table celled fixed className = 'sudokuTable'>
      <Table.Body>
        {cells.map(function(row) {
          return (
            <Table.Row className = 'sudokuRow'>
              {row.map(function(cell) {
                cellIndex++;
                var errored = false;
                var readonly = false;
                if (that.state.errored.indexOf(cellsIndexed[cellIndex]) !== -1) {
                  errored = true;
                }
                if (that.state.board[cellsIndexed[cellIndex]] !== undefined) {
                  readonly = 'readonly';
                  cell = that.state.board[cellsIndexed[cellIndex]];
                } else {
                  (that.state.cells[cellsIndexed[cellIndex]] === undefined) ? cell = '' : cell = that.state.cells[cellsIndexed[cellIndex]];
                }
                return <SudokuCell
                      index={cellIndex}
                      value={cell}
                      readonly={readonly}
                      errored={errored}
                      updateHandler={that.updateCell.bind(that)}/>;
                })}
              </Table.Row>
              );
        })}
      </Table.Body>
      </Table>
      <br />
      <Button onClick={this.checkPuzzle.bind(this)}> Check </Button>
      <Button onClick={this.resetPuzzle.bind(this)}> Reset </Button>
    </div>
    )
  }
}