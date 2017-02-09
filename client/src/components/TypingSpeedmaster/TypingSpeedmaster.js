import React from 'react';
import { Message, Form, TextArea } from 'semantic-ui-react';

export default class TypingSpeedmaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetText: 'This is the text you should be typing!',
      userText: ''
    };
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleKeypress(event) {
    this.setState({ userText: event.target.value });
  }

  render() {
    if (this.state.targetText === this.state.userText) {
      console.log('You win!');
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