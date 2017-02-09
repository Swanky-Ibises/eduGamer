import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import { Container, Segment, Divider, Button, Form } from 'semantic-ui-react'

export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
      errorText: ''
    };
  }

  //This method updates the state 'username'
  updateUsername(text) {
    this.setState({username: text.target.value});
  }

  //This method updates the state 'password'
  updatePassword(text) {
    this.setState({password: text.target.value});
  }

  //This method validates whether the user exists and passwords match. If match, log user in and save username to local storage
  handleSubmit() {
    //Local storage is used in order to get persistent error messages after re rendering
    var object = {
      username: this.state.username,
      password: this.state.password
    };
    var context = this;
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(object),
      contentType: 'application/json',
      success: function(data) {
        //on a successful post, check data. Error messages are returned so if data returns a string, an error happened
        if (data === 'string') {
          this.setState({errorText: data});
        } else {
          context.context.router.push('/');
        }
      }
    });
    //record the username on localstorage
    localStorage.setItem('username', this.state.username);
    console.log('localStorage username', localStorage.username);
  }

  render() {
    return (
      <div>
        <p>{this.state.errorText}</p>
        <Container textAlign='left'>
          <h1> Log in to Membrain </h1>
          <Segment padded>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Form.Input placeholder='Username' value={this.state.username} onChange={this.updateUsername.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Form.Input placeholder='Password' type='password' value={this.state.password} onChange={this.updatePassword.bind(this)}/>
            </Form.Field>
            <Link><Button primary fluid type='submit' onClick={this.handleSubmit.bind(this)}>Log In</Button></Link>
          </Form>
          <Divider horizontal>Or</Divider>
          <Link to="/signup"><Button secondary fluid>Sign up</Button></Link>
          </Segment>
        </Container>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}
