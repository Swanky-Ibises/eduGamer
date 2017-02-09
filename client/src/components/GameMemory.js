import React from 'react';

export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      cards: [],
      selectedCards: []
    };
  }
  render() {
    return (
      <div>
        <h2>Memory</h2>
        <h3>Score: { this.state.score }</h3>
      </div>
    );
  }
}