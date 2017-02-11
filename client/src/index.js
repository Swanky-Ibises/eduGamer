import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import LogIn from './components/Login';
import Leaderboard from './components/Leaderboard';
import {Profile} from './components/Profile';
import GameScramble from './components/Games/Scramble/GameScramble';
import GameMemory from './components/Games/GameMemory/GameMemory';
import TypingSpeedmaster from './components/Games/TypingSpeedmaster/TypingSpeedmaster';
import MemorizeTiles from './components/Games/MemorizeTiles/MemorizeTiles';
import GameSimon from './components/GameSimon';
import GameSudoku from './components/Games/Sudoku/GameSudoku';

const app = document.getElementById('app');


render(
  <Router history={hashHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={Homepage}></IndexRoute>
      <Route path="scramblegame" component={GameScramble}/>
      <Route path="memorygame" component={GameMemory}/>
      <Route path="typingspeedmaster" component={TypingSpeedmaster}/>
      <Route path="memorizetiles" component={MemorizeTiles}/>
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
