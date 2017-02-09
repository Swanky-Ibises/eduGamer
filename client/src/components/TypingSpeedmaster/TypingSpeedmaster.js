import React from 'react';
import { Message, Form, TextArea } from 'semantic-ui-react';

export default class TypingSpeedmaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetText: 'This is the text you should be typing!'
    }
  }

  handleKeypress() {}

  render() {
    return (
      <Message>
        <h1>This is typing speedmaster!</h1>
        <Message warning>
          <h3>Enter this text as fast as you can: </h3>
          {this.state.targetText}
        </Message>
        <Form>
          <TextArea placeholder='user text' />
        </Form>
      </Message>
    )
  }
}