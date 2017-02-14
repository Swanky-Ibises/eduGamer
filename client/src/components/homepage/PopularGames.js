import React from 'react';
import {Link} from 'react-router';
import { Grid, Header, Button, Message, Divider } from 'semantic-ui-react';

//Shows all the available games
export default class PopularGames extends React.Component {
  render() {
    return (
      <Grid.Column width={4}>
        <Message>
          <Header size='large'>Games</Header>
          <br />
          <Grid.Row className='popular-links'>
            <Link className='popular-link' to="/mastermindgame"><Button>Mastermind</Button></Link>
            <Link className='popular-link' to="/memorygame"><Button>Matching</Button></Link>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row className='popular-links' >
            <Link className='popular-link' to="/reactioncircle"><Button>Reaction</Button></Link>
            <Link className='popular-link' to="/scramblegame"><Button>Scramble</Button></Link>

          </Grid.Row>
          <Divider hidden />
          <Grid.Row className='popular-links' >
            <Link className='popular-link' to="/simongame"><Button>Simon</Button></Link>
            <Link className='popular-link' to="/sudokugame"><Button>Sudoku</Button></Link>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row className='popular-links' >
            <Link className='popular-link' to="/memorizetiles"><Button>Tiles</Button></Link>
            <Link className='popular-link' to="/typingspeedmaster"><Button>Typing</Button></Link>
          </Grid.Row>
          <Divider hidden />
        </Message>
      </Grid.Column>
    );
  }
}