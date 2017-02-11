import Peg from './Peg.js';

export default class DecodeRow extends React.Component {
  constructor(props) {
    super(props);
  }

  times(n) {
    return (f) => {
      Array(n).fill().map((_, i) => f(i));
    }
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.state.currentRow <= nextProps.rowId;
  }

  render() {
    var pegs = [];
    var generatePeg = (i) => {
      var idVal = this.props.name + '-' + i + 1;
      if (this.props.state.currentRow === this.props.rowId) {
        var pegClass = this.props.state.currentGuess.get(i) ? 'peg ' + this.props.state.currentGuess.get(i) : 'peg';
      } else {
        var pegClass = 'peg';
      }
      pegs.push(<Peg idVal={idVal} name={this.props.name} value={i + 1} key={idVal} pegClass={pegClass} isCurrentRow={this.props.isCurrentRow} activatePeg={this.props.activatePeg}/>);
    }
    this.times(this.props.state.pegsInRow)(generatePeg);

    return (
    <div className="decode-row">
      {pegs}
    </div>
    );
  }
}
