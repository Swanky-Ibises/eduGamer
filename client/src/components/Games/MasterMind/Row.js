import DecodeRow from './DecodeRow.js';
import HintsRow from './HintsRow.js';
import {Button, Grid} from 'semantic-ui-react';
import classNames from 'classnames';
import SubmitButton from './Submit_Button.js';

//Creates a single row with guesses, submit button, and hints
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
    return (
    <div className={rowClassName}>
      <div className="left">
        <DecodeRow name = {rowName}
          key = {this.props.rowId}
          rowId = {this.props.rowId}
          state = {this.props.state}
          isCurrentRow = {isCurrentRow}
          activatePeg = {this.props.activatePeg}/>
      </div>
      <div className="left">
        <SubmitButton rowId={this.props.rowId} state={this.props.state} submitPegs={this.props.submitPegs}/>
      </div>
      <div className="right">
        <HintsRow name={hintsRowName} key={this.props.rowId} rowId={this.props.rowId} state={this.props.state}/>
      </div>
    </div>
    );
  }
}
