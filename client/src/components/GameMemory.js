import React from 'react';
import { Table } from 'semantic-ui-react';
import GameMemoryCard from './GameMemoryCard.js';

export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      cards: [
        { value: 0, flipped: false },
        { value: 0, flipped: false },
        { value: 1, flipped: false },
        { value: 1, flipped: false },
        { value: 2, flipped: false },
        { value: 2, flipped: false },
        { value: 3, flipped: false },
        { value: 3, flipped: false },
        { value: 4, flipped: false },
        { value: 4, flipped: false }
      ],
      selectedCards: []
    };
  }

  componentDidMount() {
    this.shuffleCards();
  }

  handleClick(cardIndex) {
    // console.log(this.state.cards.slice(0, cardIndex).concat(this.flipCard(cardIndex), this.state.cards.slice(cardIndex+1)));
    // Flip a card and render cards again
    this.setState({
      cards: this.state.cards.slice(0, cardIndex).concat(this.flipCard(cardIndex), this.state.cards.slice(cardIndex+1))
    });
  }

  handleSelection(cardIndex) {

  }

  shuffleCards() {
    var copyCards = this.state.cards.slice();

    function shuffle(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
    }

    shuffle(copyCards);
    this.setState({cards: copyCards});
  }

  flipCard(cardIndex) {
    console.log('Flipped card:', cardIndex);
    // Avoid mutating array
    // Splice returns array and not object
    var cardsCopy = this.state.cards.slice();
    var flippedCard = cardsCopy.splice(cardIndex, 1);
    flippedCard[0].flipped = !flippedCard[0].flipped;
    return flippedCard;
  }

  render() {
    return (
      <div>
        <h2>Memory</h2>
        <h3>Score: { this.state.score }</h3>
        <div className='ui grid'>
          <div className='four wide centered column'>
            <Table celled>
              <Table.Body>
                <Table.Row>
                { this.state.cards.map((card, index) => (
                  <GameMemoryCard card={card} index={index} onClick={this.handleClick.bind(this)} key={index} />
                )) }
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
