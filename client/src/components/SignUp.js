import React from 'react';
import $ from 'jquery';

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

  updateUsername(text) {
    this.setState({username: text.target.value})
    console.log('state username', this.state.username)
  }

  updatePassword(text) {
    this.setState({password: text.target.value})
    console.log('state password', this.state.password)
  }

  updateConfirmPassword(text) {
    this.setState({confirmPassword: text.target.value})
    console.log('state confirmedPassword', this.state.confirmPassword)
  }

  handleSubmit() {
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
      }
      $.ajax({
        type: 'POST',
        url: '/signup',
        data: JSON.stringify(object),
        contentType: "application/json",
        success: function(data) {
          if (typeof data.redirect === 'string') {
            console.log('redirection here');
            localStorage.setItem('errorText', '');
            window.location = data.redirect;
          }
        }
      })
    }
  }

  render(){
    return (
      <div className="container">
        <div className = "row">
          <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Sign Up for MasterMind</h3>
              </div>
              <div className="panel-body">
                <form role = "form">
                  <div className="form-group">
                  <div className="error" dangerouslySetInnerHTML={{__html: this.state.errorText}}/>
                    <label>User Name</label>
                    <input type="text" name="username" className="form-control" placeholder="Please enter at least 6 characters" value={this.state.username}
                      onChange={this.updateUsername.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Please enter at least 6 characters" value={this.state.password}
                      onChange={this.updatePassword.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" name="confirm-password" className="form-control" placeholder="Confirm Password" value={this.state.confirmPassword}
                      onChange={this.updateConfirmPassword.bind(this)}/>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
