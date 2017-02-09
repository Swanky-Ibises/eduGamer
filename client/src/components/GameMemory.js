import React from 'react';
import { Table } from 'semantic-ui-react';
import GameMemoryCard from './GameMemoryCard.js';

export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      gameDisabled: false,
      cards: [
        { value: 0, flipped: false, matched: false },
        { value: 0, flipped: false, matched: false },
        { value: 1, flipped: false, matched: false },
        { value: 1, flipped: false, matched: false },
        { value: 2, flipped: false, matched: false },
        { value: 2, flipped: false, matched: false },
        { value: 3, flipped: false, matched: false },
        { value: 3, flipped: false, matched: false },
        { value: 4, flipped: false, matched: false },
        { value: 4, flipped: false, matched: false }
      ],
      lastCard: null
    };
  }

  componentDidMount() {
    this.shuffleCards();
  }

  checkMatch(cardValue, cardIndex) {
    var cards = this.state.cards;
    var score = this.state.score;

    if (this.state.gameDisabled) {
      return;
    }

    cards[cardIndex].flipped = true;
    this.setState({
      cards: cards,
      gameDisabled: true
    });

    // If one card already flipped
    if (this.state.lastCard) {
      // If match
      if (this.state.lastCard.value === cardValue) {
        cards[cardIndex].matched = true;
        this.state.lastCard.matched = true;
        this.setState({
          cards: cards,
          lastCard: null,
          gameDisabled: false,
          score: score + 10
        });
      } else {
        // No match
        setTimeout(() => {
          cards[cardIndex].flipped = false;
          this.state.lastCard.flipped = false;
          this.setState({
            cards: cards,
            lastCard: null,
            gameDisabled: false
          });
        }, 750);
      }
    } else {
      // If no card flipped yet
      this.setState({
        lastCard: cards[cardIndex],
        gameDisabled: false
      });
    }
  }

  shuffleCards() {
    var cardsCopy = this.state.cards.slice();

    function shuffle(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
    }

    shuffle(cardsCopy);
    this.setState({cards: cardsCopy});
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
                  <GameMemoryCard card={card} index={index} checkMatch={this.checkMatch.bind(this)} key={index} />
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
