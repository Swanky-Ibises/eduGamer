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
      errorText: localStorage.errorTextLogin
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
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify(object),
      contentType: 'application/json',
      success: function(data) {
        //on a successful post, check data. Error messages are returned so if data returns a string, an error happened
        if (typeof data === 'string') {
          localStorage.setItem( 'errorTextLogin', data);
        } else if (typeof data.redirect === 'string') {
          //On a successful login, redirect to homepage and remove errorTextLogin local storage
          localStorage.removeItem('errorTextLogin');
          window.location = data.redirect;
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
      <Container textAlign='left'>
        <h1> Log in to Membrain </h1>
        <Segment padded>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='Username' value={this.state.username} onChange={this.updateUsername.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Password' value={this.state.password} onChange={this.updatePassword.bind(this)}/>
          </Form.Field>
          <Button primary fluid type='submit' onClick={this.handleSubmit.bind(this)}>Log In</Button>
        </Form>
        <Divider horizontal>Or</Divider>
        <Link to="/signup"><Button secondary fluid>Sign up</Button></Link>
        </Segment>
      </Container>
      </div>

      // <div className="container">
      //   <div className = "row">
      //     <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
      //       <div className="panel panel-default">
      //         <div className="panel-heading">
      //           <h3 className="panel-title">Log in to MasterMind</h3>
      //         </div>
      //         <div className="panel-body">
      //           <form role = "form">
      //             <div className="form-group">
      //               <div className="error" dangerouslySetInnerHTML={{__html: this.state.errorText}}/>
      //               <label>User Name</label>
      //               <input type="text" name="username" className="form-control" placeholder="User Name" value={this.state.username}
      //                 onChange={this.updateUsername.bind(this)}/>
      //             </div>
      //             <div className="form-group">
      //               <label>Password</label>
      //               <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password}
      //                 onChange={this.updatePassword.bind(this)}/>
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

