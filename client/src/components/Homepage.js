import React from 'react';
import {Link} from 'react-router';
import { Grid, Header, Button, Message, Divider } from 'semantic-ui-react';
import WordOfTheDay from './WordOfTheDay.js';

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
            <Grid.Column width={4}>
              <Message>
                <Header size='large'>Popular Games</Header>
                <Divider hidden />
                <Grid.Row>
                  <Link to="/scramblegame"><Button>Scramble</Button></Link>
                  <Link to="/memorygame"><Button>Matching</Button></Link>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                  <Link to="/typingspeedmaster"><Button>Typing</Button></Link>
                  <Link to="/memorizetiles"><Button>Tiles</Button></Link>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                  <Link to="/simongame"><Button>Simon</Button></Link>
                  <Link to="/sudokugame"><Button>Sudoku</Button></Link>
                </Grid.Row>
                <Divider hidden />
              </Message>
            </Grid.Column>
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