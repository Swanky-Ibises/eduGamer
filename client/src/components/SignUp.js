import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import { Container, Segment, Divider, Button, Form } from 'semantic-ui-react'

export default class SignUp extends React.Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      errorText: localStorage.errorText
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
  handleSubmit() {
    //Local storage is used in order to get persistent error messages after re rendering
    if (this.state.username.length < 6) {
      localStorage.setItem( 'errorText', 'Please enter a username with at least 6 characters');
      this.setState({errorText: localStorage.errorText});
    } else if (this.state.password !== this.state.confirmPassword) {
      localStorage.setItem( 'errorText', 'Passwords do not match');
      this.setState({errorText: localStorage.errorText});
    } else if (this.state.password.length < 6) {
      localStorage.setItem( 'errorText', 'Please enter a password with at least 6 characters');
      this.setState({errorText: localStorage.errorText});
    } else {
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
          if (typeof data === 'string') {
            localStorage.setItem('errorText', data);
          }
          if (typeof data.redirect === 'string') {
            localStorage.removeItem('errorText');
            window.location = data.redirect;
          }
        }
      });
      //record the username on localstorage
      localStorage.setItem('username', this.state.username);
    }
  }

  //On dismount, the error text is cleared from local storage so it no longer shows up if user navigates to another component
  componentWillUnmount() {
    localStorage.removeItem('errorText');
  }

  render() {
    return (
      <div>
        <Container textAlign='left'>
          <h1> Sign up for Membrain </h1>
          <Segment padded>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' value={this.state.username} onChange={this.updateUsername.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='Password' value={this.state.password} onChange={this.updatePassword.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input placeholder='Confirm Password' value={this.state.confirmPassword} onChange={this.updateConfirmPassword.bind(this)}/>
            </Form.Field>
            <Button primary fluid type='submit' onClick={this.handleSubmit.bind(this)}>Sign Up</Button>
          </Form>
          <Divider horizontal>Or</Divider>
          <Link to="/login"><Button secondary fluid>Log In</Button></Link>
          </Segment>
        </Container>
      </div>
      // <div className="container">
      //   <div className = "row">
      //     <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
      //       <div className="panel panel-default">
      //         <div className="panel-heading">
      //           <h3 className="panel-title">Sign Up for MasterMind</h3>
      //         </div>
      //         <div className="panel-body">
      //           <form role = "form">
      //             <div className="form-group">
      //             <div className="error" dangerouslySetInnerHTML={{__html: this.state.errorText}}/>
      //               <label>User Name</label>
      //               <input type="text" name="username" className="form-control" placeholder="Please enter at least 6 characters" value={this.state.username}
      //                 onChange={this.updateUsername.bind(this)}
      //               />
      //             </div>
      //             <div className="form-group">
      //               <label>Password</label>
      //               <input type="password" name="password" className="form-control" placeholder="Please enter at least 6 characters" value={this.state.password}
      //                 onChange={this.updatePassword.bind(this)}/>
      //             </div>
      //             <div className="form-group">
      //               <label>Confirm Password</label>
      //               <input type="password" name="confirm-password" className="form-control" placeholder="Confirm Password" value={this.state.confirmPassword}
      //                 onChange={this.updateConfirmPassword.bind(this)}/>
      //             </div>
      //             <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
