import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import LogIn from './components/Login';
import Leaderboard from './components/Leaderboard';
import {Profile} from './components/Profile';
import GameScramble from './components/GameScramble';
import GameMemory from './components/GameMemory';
import TypingSpeedmaster from './components/TypingSpeedmaster/TypingSpeedmaster';
import GameSimon from './components/GameSimon';

const app = document.getElementById('app');


render(
  <Router history={hashHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={Homepage}></IndexRoute>
      <Route path="scramblegame" component={GameScramble}/>
      <Route path="memorygame" component={GameMemory}/>
      <Route path="typingspeedmaster" component={TypingSpeedmaster}/>
      <Route path="typingspeedmaster" component={TypingSpeedmaster}/>
      <Route path="leaderboard" component={Leaderboard}/>
      <Route path="profile" component={Profile}/>
      <Route path="scramblegame" component={GameScramble}/>
      <Route path="simongame" component={GameSimon}/>
      <Route path="login" component={LogIn}/>
      <Route path="signup" component={SignUp}/>
    </Route>
  </Router>
  , app
);
