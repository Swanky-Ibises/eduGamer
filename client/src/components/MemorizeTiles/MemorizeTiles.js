import React from 'react';
import { Header, Message } from 'semantic-ui-react';

// Grid colors:
//'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
//'violet', 'purple', 'pink', 'brown', 'grey', 'black'

export default class MemorizeTiles extends React.Component {
  render() {
    return (
      <Message>
        <Header size='huge'>Memorize Tiles</Header>
        <Header size='medium'>Score: </Header>
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
      </Message>
    );
  }
}