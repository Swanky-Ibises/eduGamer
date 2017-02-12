import React from 'react';
import { Message, Button } from 'semantic-ui-react';

export default class ReactionCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 0,
      seconds: 0,
      countdown: 0
    };
  }

  componentDidMount() {
    this.generateCountdown();
  }

  generateCountdown() {
    // generate random start time 1-4 seconds from now
    var randomCountdown = Math.ceil(Math.random()*4);
    this.setState({countdown: randomCountdown});
  }

  render() {
    return (
      <Message>
        <h2>Reaction Circle</h2>
        <h3>Test your reaction time...</h3>
        <h4>Timer: {this.state.seconds}.{this.state.milliseconds}</h4>
        <div className="reaction-circle">
          <Button className='circle-center'>Start</Button>
        </div>
        <h4>Countdown: {this.state.countdown}</h4>
      </Message>
    );
  }
}