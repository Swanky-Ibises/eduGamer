import classNames from 'classnames';
import $ from 'jquery';
//Handle endgame
//Name of file follows different naming convention due to issues with Heroku deployment
export default class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'mastermind';
  }

  //Send score
  saveScore(score) {
    console.log('score is being saved', score);
    //post the score to the backend if user is logged in
    if (localStorage.username) {
      var obj = {
        username: localStorage.username,
        gametype: this.gametype,
        score: score
      };
      $.ajax({
        type: 'POST',
        url: '/scores',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function(data) {
          console.log('Data posted to server', data);
        }
      });
    }
  }

  render() {
    var score = (this.props.turns === 10) ? 0 : (10 - this.props.turns);
    if (this.props.endGame) {
      this.saveScore(score);
    }
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
