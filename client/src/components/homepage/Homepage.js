import React from 'react';
import {Link} from 'react-router';
import { Grid, Message } from 'semantic-ui-react';
import WordOfTheDay from './WordOfTheDay.js';
import PopularGames from './PopularGames.js';

export default class Homepage extends React.Component {
  render() {
    return (
      <div className="membrainHome">
      <Message>
        <h1>Welcome to Membrain!</h1>
        <h4>Membrain is a collection of games designed to test and strengthen your mental fortitude.  <br/> While everyone is allowed to play these games,  creating an account gives you the ability to keep track of your personal progress!</h4>
      </Message>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <PopularGames />
            <Grid.Column width={8}>
              <WordOfTheDay />
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}