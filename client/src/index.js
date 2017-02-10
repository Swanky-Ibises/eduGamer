import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App';
import Homepage from './components/homepage/Homepage';

import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';

// Authentication
import SignUp from './components/authentication/SignUp';
import LogIn from './components/authentication/Login';

// Games
import GameScramble from './components/games/Scramble/GameScramble';
import GameMemory from './components/games/GameMemory/GameMemory';
import TypingSpeedmaster from './components/games/TypingSpeedmaster/TypingSpeedmaster';
import MemorizeTiles from './components/games/MemorizeTiles/MemorizeTiles';
import GameSimon from './components/GameSimon';
import GameSudoku from './components/games/Sudoku/GameSudoku';

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
