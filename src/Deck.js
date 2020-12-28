import React, { Component } from 'react';
import Card from './Card';

class Deck extends Component {
  static defaultProps = {
    shuffleApi: 'https://deckofcardsapi.com/api/deck/new/shuffle',
  };

  constructor(props) {
    super(props);
    this.state = {
      isDeckEmpty: false,
    };
  }

  componentDidMount() {}

  render() {
    const generateNewDeckHtml = (
      <button className="Deck-newDeckBtn" type="button">
        Get a new deck!
      </button>
    );
    const { isDeckEmpty } = this.state;
    return (
      <section className="Deck">
        <h1>Dealer</h1>
        <button className="Deck-drawBtn" type="button">
          Draw a card
        </button>
        <Card src="" desc="desc" />
        {isDeckEmpty && generateNewDeckHtml}
      </section>
    );
  }
}

export default Deck;
