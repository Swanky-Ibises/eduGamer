import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App.js';
import Homepage from './components/homepage/Homepage.js';

import Leaderboard from './components/Leaderboard.js';
import Profile from './components/Profile.js';

// Authentication
import SignUp from './components/authentication/SignUp.js';
import LogIn from './components/authentication/Login.js';

// Games
import GameScramble from './components/Games/Scramble/GameScramble.js';
import GameMemory from './components/Games/GameMemory/GameMemory.js';
import TypingSpeedmaster from './components/Games/TypingSpeedmaster/TypingSpeedmaster.js';
import MemorizeTiles from './components/Games/MemorizeTiles/MemorizeTiles.js';
import GameSimon from './components/Games/Simon/GameSimon.js';
import GameSudoku from './components/Games/Sudoku/GameSudoku.js';

const app = document.getElementById('app');


render(
  <Router history={hashHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={Homepage}></IndexRoute>
      <Route path="scramblegame" component={GameScramble}/>
      <Route path="memorygame" component={GameMemory}/>
      <Route path="memorizetiles" component={MemorizeTiles}/>
      <Route path="typingspeedmaster" component={TypingSpeedmaster}/>
      <Route path="leaderboard" component={Leaderboard}/>
      <Route path="profile" component={Profile}/>
      <Route path="scramblegame" component={GameScramble}/>
      <Route path="simongame" component={GameSimon}/>
      <Route path="sudokugame" component={GameSudoku}/>
      <Route path="login" component={LogIn}/>
      <Route path="signup" component={SignUp}/>
    </Route>
  </Router>
  , app
);
