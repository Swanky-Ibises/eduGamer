import React from 'react';
import { Message, Form, TextArea } from 'semantic-ui-react';

export default class TypingSpeedmaster extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      timer: 0,
      targetText: 'This is the text you should be typing!',
      userText: '',
      started: false,
      done: false
    };
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentWillUpdate() {
    if (this.state.targetText === this.state.userText && !this.state.done) {
      this.gameEnd();
    }
  }

  handleKeypress(event) {
    if (!this.state.started) {
      this.startTimer();
      this.setState({started: true});
    }
    if (!this.state.done) {
      this.setState({ userText: event.target.value });
    }
  }

  gameEnd() {
    this.endTimer();
    this.setState({done: true});
    this.submitScore();
  }

  startTimer() {
    var context = this;
    this.timer = setInterval(function() {
      context.setState({timer: context.state.timer + 1});
    }, 1000);
  }

  endTimer() {
    clearInterval(this.timer);
  }

  submitScore() {}

  render() {
    return (
      <Message>
        <h1>This is typing speedmaster!</h1>
        <h2>Time taken: {this.state.timer}</h2>
        <Message warning>
          <h3>Enter this text as fast as you can: </h3>
          {this.state.targetText}
        </Message>
        {this.state.done && <h2>You win!!!</h2>}
        <Form>
          <TextArea placeholder='Type here' onChange={this.handleKeypress} />
        </Form>
      </Message>
    )
  }
}