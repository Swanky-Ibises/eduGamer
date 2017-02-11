import DecodeRow from './DecodeRow.js';
import HintsRow from './HintsRow.js';
import {Button} from 'semantic-ui-react';
import classNames from 'classnames';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  times(n) {
    return (f) => {
      Array(n).fill().map((_, i) => f(i));
    }
  }

  render() {
    var isCurrentRow = this.props.state.currentRow === this.props.rowId;
    var rowClassName = classNames({
      'row': true,
      'clearfix': true,
      'current': isCurrentRow
    });
    var hintsRowName = 'hintsRow-' + this.props.rowId;
    var rowName = 'decodeRow-' + this.props.rowId;
    var buttonClassName = classNames({
      'submit': true,
      'hidden': !(this.props.state.currentGuess.size >= this.props.state.pegsInRow && this.props.state.currentRow === this.props.rowId)
    });
    return (
    <div className={rowClassName}>
      <div className = 'left'>
        <DecodeRow name = {rowName}
        key = {this.props.rowId}
        rowId = {this.props.rowId}
        state = {this.props.state}
        isCurrentRow = {isCurrentRow}
        activatePeg = {this.props.activatePeg}/>
      </div>
      <div className = 'left'>
        <Button className={buttonClassName} onClick={this.props.submitPegs}></Button>
      </div>
      <div className = 'right'>
        <HintsRow name={hintsRowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state}/>
      </div>
    </div>
    );
  }
}
