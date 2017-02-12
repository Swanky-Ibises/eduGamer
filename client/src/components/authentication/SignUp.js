import React from 'react';
import $ from 'jquery';
import {Link, hashHistory} from 'react-router';
import { Container, Segment, Divider, Button, Form } from 'semantic-ui-react'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
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

  //This method updates the state 'confirmPassword'
  updateConfirmPassword(text) {
    this.setState({confirmPassword: text.target.value});
  }

  //This method validates the form on submission. If validation is passed, the user information will be passed to the server and database
  handleSubmit(e) {
    e.preventDefault();
    //Local storage is used in order to get persistent error messages after re rendering
    if (this.state.username.length < 4) {
      this.setState({errorText: 'Please enter a username with at least 4 characters'});
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({errorText: 'Passwords do not match'});
    } else if (this.state.password.length < 6) {
      this.setState({errorText: 'Please enter a password with at least 6 characters'});
    } else {
      var context = this;
      var object = {
        username: this.state.username,
        password: this.state.password
      };
      $.ajax({
        type: 'POST',
        url: '/signup',
        data: JSON.stringify(object),
        contentType: 'application/json',
        success: function(data) {
          context.context.router.push('/');
        }
      });
      // Record the username on localstorage
      localStorage.setItem('username', this.state.username);
    }
  }

  // On dismount, the error text is cleared from local storage so it no longer shows up if user navigates to another component
  componentWillUnmount() {
    localStorage.removeItem('errorText');
  }

  render() {
    return (
      <div>
        <Container>
          <Segment padded>
          <h1> Sign up for Membrain </h1>
          <p>{this.state.errorText}</p>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Form.Input placeholder='Username' value={this.state.username} onChange={this.updateUsername.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Form.Input placeholder='Password' type='password' value={this.state.password} onChange={this.updatePassword.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <Form.Input placeholder='Confirm Password' type='password' value={this.state.confirmPassword} onChange={this.updateConfirmPassword.bind(this)}/>
            </Form.Field>
            <Button primary fluid onClick={this.handleSubmit.bind(this)}>Sign Up</Button>
          </Form>
          <Divider horizontal>Or</Divider>
          <Link to="/login"><Button secondary fluid>Log In</Button></Link>
          </Segment>
        </Container>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
}
