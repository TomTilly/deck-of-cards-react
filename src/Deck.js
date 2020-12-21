import React, { Component } from 'react';
import Card from './Card';

class Deck extends Component {
  static defaultProps = {
    shuffleApi: 'https://deckofcardsapi.com/api/deck/new/shuffle',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <section className="Deck">
        <h1>Dealer</h1>
        <Card src="" desc="desc" />
      </section>
    );
  }
}

export default Deck;
