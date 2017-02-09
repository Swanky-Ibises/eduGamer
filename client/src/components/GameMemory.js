import React from 'react';
import GameMemoryCard from './GameMemoryCard.js';

export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      cards: [
        { value: 1, flipped: false },
        { value: 1, flipped: true },
        { value: 2, flipped: false },
        { value: 2, flipped: false }
      ],
      selectedCards: []
    };
  }
  render() {
    return (
      <div>
        <h2>Memory</h2>
        <h3>Score: { this.state.score }</h3>
        <table className='table'>
          <tbody>
            <tr>
            { this.state.cards.map((card, index) => (
              <GameMemoryCard card={card} index={index} key={index} />
            )) }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
