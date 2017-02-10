import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import $ from 'jquery';
import {sudoku} from '../vendor/sudoku.js';

export default class GameSudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: sudoku.generate(),
      cells: {},
      errored: []
    };
  }

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
    console.log(board);
    return board;
  }

  //Puts the cells in array of row arrays
  arrayCells() {
    var cells = Object.keys(this.state.cells);
    var cells2D = [];
    var i;
    var j;
    for (i = 0, j = cells.length; i < j; i += 9) {
      cells2D.push(cells.slice(i, i + 9));
    }
    console.log(cells2D);
    return cells2D;
  }
  //Updates the cell
  updateCell() {
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
    var conflicts = sudoku.getConflicts(this.state.cells);
    var erroredFields = [];

    if (!conflicts.length > 0) {
      return true;
    }

    // Loop over all conflicts and add each conflicted cell to our error object
    conflicts.each(function(value, key) {
      value.errorFields.each(function(v, k) {
        erroredFields.push(v);
      });
    });

    var erroredQuadrant = conflicts[0].unit;

    this.setState({
      errored: erroredFields
    });
  }

  resetPuzzle() {
    this.replaceState(this.getInitialState(), function() {
      this.createBoard();
    });
  }

  render(){
    var that = this;
    var cells = this.arrayCells();
    var cellsIndexed = Object.keys(this.state.cells);
    var cellIndex = -1;

    return (
      <div className = 'sudokuBoard'>
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
                }
                return <Cell
                      index={cellIndex}
                      value={cell}
                      readonly={readonly}
                      errored={errored}
                      updateHandler={that.updateCell}/>;
                })}
              </Table.Row>
              );
        })}
      </Table.Body>
      </Table>
      <br />
      <Button onclick={this.checkPuzzle}> Check </Button>
      <Button> Reset </Button>
    </div>
    )
  }
}

var Cell = React.createClass({
  handleChange: function(event) {
    var html = this.getDOMNode().firstChild.value;
    this.props.updateHandler(this.props.index, html);
  },
  render: function() {
    return (
      <Table.Cell className = 'sudokuCell' textAlign='center' width={1}>
        <input type="text"
            value={this.props.value}
            onChange={this.handleChange}
            data-errored={this.props.errored}
            className="sudoku-cell"
            readOnly={this.props.readonly} />
      </Table.Cell>
    )
  }
});