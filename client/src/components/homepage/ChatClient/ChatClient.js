import React from 'react';
import { Message, Grid, Form, Button, Input, Feed } from 'semantic-ui-react';
import $ from 'jquery';

export default class ChatClient extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      user: localStorage.username,
      usersConnected: 0,
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
    socket.on('newMessage', function(message) {
      context.handleNewMessage(message);
    });
    socket.on('userJoined', function(data) {
      context.handleUserJoinedOrLeft(data);
    });
    socket.on('userLeft', function(data) {
      context.handleUserJoinedOrLeft(data);
    });
  }

  componentDidUpdate() {
    var chatBox = $('.chat-box');
    chatBox.scrollTop(chatBox.prop("scrollHeight"));
  }

  componentWillUnmount() {
    var socket = this.socket;
    socket.off('newMessage');
    socket.off('userJoined');
    socket.off('userLeft');
  }

  handleInputChange(e) {
    var text = e.target.value;
    this.setState({ userInput: text });
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.userInput !== '') {
      this.sendMessage(this.state.userInput);
      this.setState({userInput: ''});
    }
  }

  handleNewMessage(message) {
    var messagesCopy = this.state.messages.slice();
    messagesCopy.push({ user: message.user, text: message.text });
    this.setState({ messages: messagesCopy });
  }

  handleUserJoinedOrLeft(data) {
    var usersConnected = data.usersConnected;
    this.setState({usersConnected: usersConnected});
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
            <h5>Currently connected: {this.state.usersConnected} users</h5>
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