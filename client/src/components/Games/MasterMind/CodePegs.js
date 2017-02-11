import Peg from './Peg.js';
export default class CodePegs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var pegs = [];
    console.log(this.props.colors);
    for(let [key, value] of this.props.colors) {
      var idVal = 'peg-' + key;
      var pegClass = 'peg ' + value;
      if (value === this.props.selectedPeg) {
        pegClass = pegClass + ' selected';
      }
      pegs.push(<Peg idVal={idVal} name = 'peg' value = {value} key={idVal} pegClass={pegClass} isCurrentRow={true} activatePeg={this.props.activatePeg}/>);
    }
    return (
    <div className="codepegs right">
      {pegs}
    </div>
    );
  }
}
