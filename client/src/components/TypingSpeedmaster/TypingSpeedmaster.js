import React from 'react';
import { Message, Form, TextArea } from 'semantic-ui-react';

export default class TypingSpeedmaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetText: 'This is the text you should be typing!',
      userText: '',
      started: false,
      done: false
    };
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleKeypress(event) {
    if (!this.state.done) {
      this.setState({ userText: event.target.value });
    }
  }

  gameEnd() {
    console.log('You win!');
  }

  render() {
    if (this.state.targetText === this.state.userText) {
      this.gameEnd();
    }
    return (
      <Message>
        <h1>This is typing speedmaster!</h1>
        <Message warning>
          <h3>Enter this text as fast as you can: </h3>
          {this.state.targetText}
        </Message>
        <Form>
          <TextArea placeholder='Type here' onChange={this.handleKeypress} />
        </Form>
      </Message>
    )
  }
}