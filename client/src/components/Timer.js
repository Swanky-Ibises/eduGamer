import React from 'react';

export default class Timer extends React.Component {
  constructor () {
    super();
    this.state = {
      timeLeft: 60
    };
  }

  decrementTimer() {
    this.setState({timeLeft: this.state.timeLeft - 1});
    if (this.state.timeLeft <= 0) {
      return;
    }
    setTimeout(this.decrementTimer.bind(this), 1000);
  }


  componentDidMount() {
    this.decrementTimer();
  }

  render() {
    return (
      <div>
        <div className="timer">Time Remaining : {this.state.timeLeft}</div>
      </div>
    );
  }
}