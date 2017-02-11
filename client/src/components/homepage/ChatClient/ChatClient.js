import React from 'react';
import { Message, Grid } from 'semantic-ui-react';

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      user: localStorage.username,
      messages: []
    };
  }

  componentDidMount() {
    var context = this;
    var socket = this.socket;
    // Event handlers for messages
    socket.on('hello', function(data) {
      console.log(data);
    });
  }

  sendMessage(message) {
    var context = this;
    var socket = this.socket;
    socket.emit('newMessage', {
      user: context.state.user,
      message: message
    });
  }

  render() {
    return (
      <Grid.Column width={12}>
        <Message>
          <h1>Hello World</h1>
        </Message>
      </Grid.Column>
    );
  }
}