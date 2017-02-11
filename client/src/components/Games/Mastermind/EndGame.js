import classNames from 'classnames';
export default class EndGame extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var endGameInfoClass = classNames({
      'endgame': true,
      'hidden': !this.props.endGame
    });
    var endGameStatusClass = classNames({
      'endgame-relative': true,
      'success': this.props.success,
      'failure': !this.props.success
    });
    var infoText = this.props.success ? 'Congratulations!' : 'Game over';

    return (
    <div className={endGameInfoClass}>
      <div className = {endGameStatusClass}>
        <h2 className = "endgame-header">{infoText}</h2>
        <button className="endgame-btn" onClick={this.props.reloadGame}> Play again </button>
      </div>
      <div className="endgame-relative endgame-overlay"></div>
    </div>
    );
  }
}
