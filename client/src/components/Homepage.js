import React from 'react';
import {Link} from 'react-router';
import { Button } from 'semantic-ui-react';

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to MasterMind!</h2>
        <h4>MasterMind is a collection of games designed to test and strengthen your mental fortitude.  <br/> While everyone is allowed to play these games,  creating an account gives you the ability to keep track of your personal progress!</h4>
            <Link to="/scramblegame"><Button>Scramble</Button></Link>
      </div>
    );
  }
}