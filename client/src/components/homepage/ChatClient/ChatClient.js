import React from 'react';
import { Message, Grid, Form, Button, Comment, Input } from 'semantic-ui-react';

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
      console.log(data.message);
    });
    socket.on('newMessage', function(message) {
      context.handleNewMessage(message);
    });
    this.sendMessage('test message');
  }

  handleNewMessage(message) {
    var messagesCopy = this.state.messages.slice();
    messagesCopy.push({ user: message.user, text: message.text });
    this.setState({ messages: messagesCopy });
  }

  sendMessage(message) {
    var context = this;
    var socket = this.socket;
    socket.emit('postMessage', {
      user: context.state.user,
      text: message
    });
  }

  handleInputChange(e) {

  }

  render() {
    return (
      <Grid.Column width={12}>
        <Message>
          <h1>Chat with your fellow Membrainers!</h1>
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
            <Form.Field inline>
              <label>{this.state.user}</label>
              <Input placeholder='Your message' onChange={this.handleInputChange.bind(this)} />
              <Button primary>Send</Button>
            </Form.Field>
          </Form>
        </Message>
      </Grid.Column>
    );
  }
}