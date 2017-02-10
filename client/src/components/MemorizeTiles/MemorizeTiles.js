import React from 'react';
import { Header, Message, Button } from 'semantic-ui-react';

export default class MemorizeTiles extends React.Component {
  render() {
    return (
      <Message>
        <Header size='huge'>Memorize Tiles</Header>
        <br />
        <Header size='medium'>Score: 0</Header>
        <br />
        <Header size='medium'>Time left: 10 seconds</Header>
        <Header size='medium'>Select the boxes you just saw...</Header>
        <br />
        <Button>Start Game</Button>
        <div className='memorize-tile-game'>
          <div>
            <div className='memorize-tile tile-white'></div>
            <div className='memorize-tile tile-white'></div>
            <div className='memorize-tile tile-white'></div>
            <div className='memorize-tile tile-red'></div>
          </div>
          <div>
            <div className='memorize-tile tile-red'></div>
            <div className='memorize-tile tile-red'></div>
            <div className='memorize-tile tile-white'></div>
            <div className='memorize-tile tile-white'></div>
          </div>
          <div>
            <div className='memorize-tile tile-red'></div>
            <div className='memorize-tile tile-white'></div>
            <div className='memorize-tile tile-white'></div>
            <div className='memorize-tile tile-red'></div>
          </div>
          <div>
            <div className='memorize-tile tile-red'></div>
            <div className='memorize-tile tile-red'></div>
            <div className='memorize-tile tile-red'></div>
            <div className='memorize-tile tile-red'></div>
          </div>
        </div>
        <br />
        <Button>Submit</Button>
      </Message>
    );
  }
}