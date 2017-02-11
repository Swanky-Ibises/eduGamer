import React from 'react';
import { Message, Grid } from 'semantic-ui-react';

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
  }

  componentDidMount() {
    var socket = this.socket;
    // Event handlers for messages
    socket.on('hello', function(data) {
      console.log(data);
      console.log(localStorage.username);
      socket.emit('connected', {user: localStorage.username});
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