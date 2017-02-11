import Hint from './Hint.js';
export default class HintsRow extends React.Component {
  constructor(props) {
    super(props);
  }

  times(n) {
    return (f) => {
      Array(n).fill().map((_, i) => f(i));
    }
  }

  render() {
    const hints = [];
    let idVal;
    let hintClass = '';
    let exactMatches = this.props.state.exactMatches;
    let valueMatches = this.props.state.valueMatches;

    let generateHint = (i) => {
      hintClass = 'hint';
      idVal = this.props.name + '-' + i + 1;

      if(this.props.state.currentRow - 1 === this.props.rowId) {
        if(exactMatches > 0) {
          hintClass = hintClass + ' exact-matches';
          exactMatches--;
        } else if (valueMatches > 0) {
          hintClass = hintClass + ' value-matches';
          valueMatches--;
        } else {
          hintClass = hintClass + ' none-matches';
        }
      }
      hints.push(<Hint key={idVal} hintClass={hintClass} rowId={this.props.rowId} state={this.props.state}/>);
    };

    this.times(this.props.state.pegsInRow)(generateHint);

    return (
    <div className="hints-row">
      {hints}
    </div>
    );
  }
}
