import Row from './Row.js';
export default class DecodingBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  times(n) {
    return (f) => {
      Array(n).fill().map((_, i) => f(i));
    }
  }
  //Generate the decoding board
  render() {
    let rows = [];
    let rowName;
    let generateRow = (i) => {
      rowName = 'decodeRow-' + i + 1;
      rows.push(<Row name={rowName}
        key={i + 1}
        rowId = {i}
        state = {this.props.state}
        activatePeg = {this.props.activatePeg}
        submitPegs = {this.props.submitPegs} />);
    }
    this.times(this.props.state.attempts)(generateRow);
    return (
    <div className="decoding-board left">
      {rows}
    </div>
    );
  }
}
