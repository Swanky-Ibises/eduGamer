import React, { Component } from 'react';
import { Menu, Segment, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router';


export const NavBar = () => {
  var handleLogout = () => {
    console.log('handleLogout has been invoked.');
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: function(data) {
        window.location = data.redirect;
        console.log('Post for logout completed successfully.')
      }
    });
    //removes the username from localstorage
    localStorage.removeItem('username');
    console.log('localStorage username', localStorage.username);
  }

  return (
    <Menu color='blue'>
      <Link to="/">
        <Menu.Item name='home'> Home </Menu.Item>
      </Link>

      <Link to="/leaderboard">
        <Menu.Item name='leaderboard'> Leaderboard </Menu.Item>
      </Link>

      <Dropdown item text='Games'>
        <Dropdown.Menu>
          <Link to="/mastermindgame">
            <Dropdown.Item> Mastermind </Dropdown.Item>
          </Link>
          <Link to="/memorygame">
            <Dropdown.Item> Matching </Dropdown.Item>
          </Link>
          <Link to="/reactioncircle">
            <Dropdown.Item> Reaction </Dropdown.Item>
          </Link>
          <Link to="/scramblegame">
            <Dropdown.Item> Scramble </Dropdown.Item>
          </Link>
          <Link to="/simongame">
            <Dropdown.Item> Simon </Dropdown.Item>
          </Link>
          <Link to="/sudokugame">
            <Dropdown.Item> Sudoku </Dropdown.Item>
          </Link>
          <Link to="/memorizetiles">
            <Dropdown.Item> Tiles </Dropdown.Item>
          </Link>
          <Link to="/typingspeedmaster">
            <Dropdown.Item> Typing </Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position='right'>
        { localStorage.username && <Link to="/profile">
          <Menu.Item name='profile'> Profile </Menu.Item>
        </Link> }

        { !localStorage.username && <Link to="/login">
          <Menu.Item name='login'> Login </Menu.Item>
        </Link> }

        { localStorage.username && <Link to="/" onClick={handleLogout}>
          <Menu.Item name='logout'> Logout </Menu.Item>
        </Link> }
      </Menu.Menu>
    </Menu>
  )
}
