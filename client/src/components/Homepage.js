import React from 'react';
import {Link} from 'react-router';
import { Grid, Header, Button, Divider } from 'semantic-ui-react';

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Membrain!</h1>
        <h4>Membrain is a collection of games designed to test and strengthen your mental fortitude.  <br/> While everyone is allowed to play these games,  creating an account gives you the ability to keep track of your personal progress!</h4>
      <Divider section />
        <Grid columns={2}>
          <Grid.Column>
            <Header size='large'>Popular Games</Header>
            <Link to="/scramblegame"><Button>Scramble</Button></Link>
            <Link to="/memorygame"><Button>Memory</Button></Link>
          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid>
      </div>
    );
  }
}