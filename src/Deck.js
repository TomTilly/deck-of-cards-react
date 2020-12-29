import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';
import { checkStatusAndParse } from './util';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  static fetchNewDeck() {
    return fetch(`${API_BASE_URL}/new/shuffle/`).then(checkStatusAndParse);
  }

  constructor(props) {
    super(props);
    this.state = {
      isDeckEmpty: false,
      hasError: false,
      deckID: null,
      drawnCards: [],
      deckHasLoaded: false,
    };
    this.drawCard = this.drawCard.bind(this);
    this.generateNewDeck = this.generateNewDeck.bind(this);
  }

  componentDidMount() {
    Deck.fetchNewDeck()
      .then((data) => {
        console.log(data);
        this.setState({ deckID: data.deck_id, deckHasLoaded: true });
      })
      .catch((err) => {
        this.setState({ hasError: true });
        console.error(err);
      });
  }

  generateNewDeck(e) {
    Deck.fetchNewDeck()
      .then((data) => {
        console.log(data);
        this.setState({
          deckID: data.deck_id,
          drawnCards: [],
          isDeckEmpty: false,
          deckHasLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({ hasError: true });
        console.error(err);
      });
  }

  drawCard(e) {
    const { isDeckEmpty, deckID: id } = this.state;
    if (isDeckEmpty) return;
    const drawCardUrl = `${API_BASE_URL}/${id}/draw/`;
    fetch(drawCardUrl)
      .then(checkStatusAndParse)
      .then((data) => {
        console.log(data);
        this.setState((st) => ({
          drawnCards: [...st.drawnCards, data.cards[0]],
          isDeckEmpty: !data.remaining,
        }));
      })
      .catch((err) => {
        this.setState({ hasError: true });
        console.error(err);
      });
  }

  render() {
    const { isDeckEmpty, hasError, drawnCards, deckHasLoaded } = this.state;
    const generateNewDeckHtml = (
      <div>
        <p>No more cards!</p>
        <button
          className="Deck-btn"
          type="button"
          onClick={this.generateNewDeck}
        >
          Get a new deck!
        </button>
      </div>
    );
    const errorHtml = (
      <p className="error">
        There was a problem communicating with the
        <a href="http://deckofcardsapi.com/" target="noopener noreferrer">
          Deck of Cards API.
        </a>
        &nbsp;Please try again in a minute.
      </p>
    );
    const drawCardHtml = (
      <button
        className="Deck-btn"
        type="button"
        onClick={this.drawCard}
        disabled={isDeckEmpty || !deckHasLoaded}
      >
        Draw a card
      </button>
    );
    const cardsHtml = drawnCards.map((card) => {
      const desc = `${card.value} of ${card.suit}`;
      return <Card imgSrc={card.images.png} desc={desc} key={desc} />;
    });
    return (
      <section className="Deck">
        <h1 className="Deck-title">Dealer</h1>
        {!hasError ? drawCardHtml : errorHtml}
        <div className="Deck-cards">{cardsHtml}</div>
        {isDeckEmpty && generateNewDeckHtml}
      </section>
    );
  }
}

export default Deck;
