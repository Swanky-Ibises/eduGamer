import React, { Component } from 'react';
import { NavBar } from './NavBar';
import { Login } from './authentication/Login';
import { SignUp } from './authentication/SignUp';
import Homepage from './homepage/Homepage';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}