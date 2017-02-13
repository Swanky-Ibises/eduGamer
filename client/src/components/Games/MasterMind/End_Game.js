import classNames from 'classnames';
export default class EndGame extends React.Component {
  constructor(props) {
    super(props);
  }
  //Send score
  render() {
    var score = this.props.turns === 10 ? 0 : 11 - this.props.turns;

    var endGameInfoClass = classNames({
      'endgame': true,
      'hidden': !this.props.endGame
    });
    var endGameStatusClass = classNames({
      'endgame-relative': true,
      'success': this.props.success,
      'failure': !this.props.success
    });
    var infoText = this.props.success ? 'Congratulations! Your score is ' + score + '.' : 'Game over. Your score is 0.';

    return (
    <div className={endGameInfoClass}>
      <div className = {endGameStatusClass}>
        <h2 className = "endgame-header">{infoText}</h2>
        <button className="endgame-btn" onClick={this.props.reloadGame}> Try again </button>
      </div>
      <div className="endgame-relative endgame-overlay"></div>
    </div>
    );
  }
}
