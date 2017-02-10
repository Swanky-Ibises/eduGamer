import React from 'react';
import $ from 'jquery';
import { Message, Form, TextArea } from 'semantic-ui-react';

export default class TypingSpeedmaster extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.sentScore = false;
    this.state = {
      timer: 0,
      score: 0,
      targetText: 'targetText should go here',
      userText: '',
      started: false,
      done: false,
    };
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentWillMount() {
    // Replaces 'Some text' above
    this.getTargetText();
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

  getTargetText() {
    var context = this;
    $.ajax({
      type: 'GET',
      crossDomain: true,
      url: 'http://numbersapi.com/random/trivia',
      success: function(data) {
        context.setState({targetText: data});
      }
    });
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

  submitScore() {
    this.setState({score: 200 - this.state.timer});
    if (!this.sentScore) {
      // Workaround to React's lifecycle hooks
      // submitScore gets invoked twice because of componentWillUpdate functionality
      this.sentScore = true;
    }
  }

  render() {
    return (
      <Message>
        <h1>This is typing speedmaster!</h1>
        <h2>Time taken: {this.state.timer}</h2>
        <Message warning>
          <h3>Enter this text as fast as you can: </h3>
          <div className='typing-text'><h4>{this.state.targetText}</h4></div>
        </Message>
        {this.state.done && <h2>You win!!! Score: {this.state.score}</h2>}
        <Form>
          <TextArea placeholder='Type here' onChange={this.handleKeypress} />
        </Form>
      </Message>
    )
  }
}