import React from 'react';
import { Message, Button } from 'semantic-ui-react';

export default class ReactionCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      inProgress: false,
      locked: true,
      fail: false,
      countdown: 0,
      score: null
    };
  }

  generateCountdown() {
    // generate random start time 1-4 seconds from now
    var randomCountdown = Math.ceil(Math.random()*8);
    this.setState({countdown: randomCountdown});
  }

  launchCountdown(callback) {
    var context = this;
    this.countdown = setInterval(function() {
      if (context.state.countdown > 0) {
        context.setState({countdown: context.state.countdown - 1});
      } else {
        clearInterval(context.countdown);
        callback();
      }
    }, 1000);
  }

  startGame(e) {
    var context = this;
    e.preventDefault();
    this.generateCountdown();
    this.setState({
      startTime: 0,
      score: null,
      inProgress: true,
      locked: true,
      fail: false
    });
    this.launchCountdown(function() {
      context.setState({locked: false, startTime: Date.now()});
    });
  }

  handleCircleClick() {
    if (this.state.locked && this.state.inProgress) {
      console.log('failed');
      this.loseGame();
    } else if (!this.state.locked && this.state.inProgress) {
      console.log('win');
      this.winGame();
    }
  }

  winGame() {
    this.endTimer();
  }

  loseGame() {
    this.setState({fail: true});
    this.endTimer();
  }

  endTimer() {
    var now = Date.now();
    clearInterval(this.timer);
    this.setState({
      countdown: 0,
      locked: true,
      inProgress: false,
      score: now-this.state.startTime
    });
  }

  render() {
    return (
      <Message className='reaction-box'>
        <div className='reaction-wrapper'>
          <div className='reaction-element'>
            <h2>Reaction Circle</h2>
            <h3>Test your reaction time...</h3>
            {this.state.fail && <h4>You clicked too early!</h4>}
            {this.state.score && !this.state.fail && <h4>Score (lower is better): {this.state.score}</h4>}
          </div>
          <div className='reaction-element'>
            <div className={'reaction-circle ' + (!this.state.locked && this.state.inProgress ? 'circle-green' : '')} onClick={this.handleCircleClick.bind(this)}></div>
            {this.state.countdown===0 && !this.state.inProgress && <Button className='circle-center' onClick={this.startGame.bind(this)}>Start</Button>}
          </div>
        </div>
      </Message>
    );
  }
}