import React from 'react';
import { Message, Grid, Form, TextArea, Button, Comment } from 'semantic-ui-react';

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      user: localStorage.username,
      messages: [
                  {user: 'andy', text: 'hi guys!'},
                  {user: 'kevin', text: 'wassup'},
                  {user: 'josephine', text: 'trundle'},
                  {user: 'eric', text: 'Want a protein shake?'}
                ]
    };
  }

  componentDidMount() {
    var context = this;
    var socket = this.socket;
    // Event handlers for messages
    socket.on('hello', function(data) {
      console.log(data);
    });
    // this.sendMessage('test message');
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
          <Comment.Group>

            {this.state.messages.map((message, i) => (
              <Comment key={i}>
                <Comment.Avatar src='http://semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>{message.user}</Comment.Author>
                  <Comment.Metadata>
                    <div>{Date.now()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{message.text}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
          <Form>
            <TextArea placeholder='Your message goes here' autoHeight />
          </Form>
        </Message>
      </Grid.Column>
    );
  }
}