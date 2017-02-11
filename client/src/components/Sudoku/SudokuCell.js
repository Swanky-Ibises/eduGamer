import React from 'react';
import { Button, Table } from 'semantic-ui-react';

export default class SudokuCell extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange (event) {
    this.props.updateHandler(this.props.index, event.target.value);
  }

  render() {
    return (
      <Table.Cell className = 'sudokuCell' textAlign='center' width={1}>
        <input type="text"
            value={this.props.value}
            onChange={this.handleChange.bind(this)}
            data-errored={this.props.incorrect}
            className="sudoku-cell"
            readOnly={this.props.readonly} />
      </Table.Cell>
    )
  }
}