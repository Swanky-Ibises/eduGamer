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
      // This is fine for now because this is the public wordnik key you can find on their site
      url: 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
      success: function(data) {
        var words = [];
        data.forEach(datem => {words.push(datem.word)});
        context.setState({targetText: words.join(' ')});
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
          {this.state.targetText}
        </Message>
        {this.state.done && <h2>You win!!! Score: {this.state.score}</h2>}
        <Form>
          <TextArea placeholder='Type here' onChange={this.handleKeypress} />
        </Form>
      </Message>
    )
  }
}