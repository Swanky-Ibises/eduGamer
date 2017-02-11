import React from 'react';
import { Message, Grid, Form, Button, Input, Feed } from 'semantic-ui-react';
import $ from 'jquery';

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      user: localStorage.username,
      userInput: '',
      messages: [
                  {user: 'Membrain Team', text: 'Check out the new games!'}
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
  }

  componentDidUpdate() {
    var chatBox = $('.chat-box');
    chatBox.scrollTop(chatBox.prop("scrollHeight"));
  }

  handleInputChange(e) {
    var text = e.target.value;
    this.setState({ userInput: text });
  }

  handleClick() {
    this.sendMessage(this.state.userInput);
    this.setState({userInput: ''});
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

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={8}>
          <Message>
            <h1>Chat with your fellow Membrainers!</h1>
            <div className='chat-box'>
              <Feed>
                {this.state.messages.map((message, i) => (
                  <Feed.Event key={i}>
                    <Feed.Label>
                      <img className='chat-icon' src='http://semantic-ui.com/images/avatar/small/matt.jpg' />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User>{message.user ? message.user : 'anonymous'}</Feed.User>
                      </Feed.Summary>
                      <Feed.Extra text>{message.text}</Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>
                ))}
              </Feed>
            </div>
            <Form>
              <Form.Field inline>
                <label>{this.state.user}</label>
                <Input placeholder='Your message' onChange={this.handleInputChange.bind(this)} value={this.state.userInput} />
                <Button primary onClick={this.handleClick.bind(this)}>Send</Button>
              </Form.Field>
            </Form>
          </Message>
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid.Row>
    );
  }
}