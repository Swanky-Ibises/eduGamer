import React from 'react';

export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      cards: [
        { value: 1, flipped: false },
        { value: 1, flipped: false },
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
            { this.state.cards.map((card, index) => (<td key={index}>{card.value}</td>)) }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}