import React from 'react';
import {Link} from 'react-router';
import { Grid, Header, Button, Message, Divider } from 'semantic-ui-react';

export default class PopularGames extends React.Component {
  render() {
    return (
      <Grid.Column width={4}>
        <Message>
          <Header size='large'>Popular Games</Header>
          <br />
          <Grid.Row className='popular-links'>
            <Link className='popular-link' to="/scramblegame"><Button>Scramble</Button></Link>
            <Link className='popular-link' to="/memorygame"><Button>Matching</Button></Link>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row className='popular-links' >
            <Link className='popular-link' to="/typingspeedmaster"><Button>Typing</Button></Link>
            <Link className='popular-link' to="/memorizetiles"><Button>Tiles</Button></Link>
          </Grid.Row>
          <Divider hidden />
          <Grid.Row className='popular-links' >
            <Link to="/sudokugame"><Button>Sudoku</Button></Link>
            <Link to="/reactioncircle"><Button>Reaction</Button></Link>
          </Grid.Row>
          <Divider hidden />
        </Message>
      </Grid.Column>
    );
  }
}

//            <Link to="/simongame"><Button>Simon</Button></Link>