import React from 'react';
import {Link} from 'react-router';
import { Grid, Header, Button, Message, Divider } from 'semantic-ui-react';

export default class PopularGames extends React.Component {
  render() {
    return (
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
    );
  }
}