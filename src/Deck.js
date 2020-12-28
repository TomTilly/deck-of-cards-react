import React, { Component } from 'react';
import Card from './Card';

function checkStatusAndParse(response) {
  if (!response.ok)
    throw new Error(
      `Error fetching resource. Response Status Code: ${response.status}`
    );

  return response.json();
}

class Deck extends Component {
  static defaultProps = {
    newDeckUrl: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
  };

  constructor(props) {
    super(props);
    this.state = {
      isDeckEmpty: false,
      hasError: false,
      deckID: '',
      drawnCards: [],
    };
    this.drawCard = this.drawCard.bind(this);
  }

  componentDidMount() {
    const { newDeckUrl } = this.props;
    fetch(newDeckUrl)
      .then(checkStatusAndParse)
      .then((data) => {
        console.log(data);
        this.setState({ deckID: data.deck_id });
      })
      .catch((err) => {
        this.setState({ hasError: true });
        console.error(err);
      });
  }

  drawCard(e) {
    const { deckID } = this.state;
    const drawCardUrl = `https://deckofcardsapi.com/api/deck/${deckID}/draw/`;
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
    const { isDeckEmpty, hasError, drawnCards } = this.state;
    const generateNewDeckHtml = (
      <div>
        <p>Deck is empty!</p>
        <button className="Deck-newDeckBtn" type="button">
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
      <button className="Deck-drawBtn" type="button" onClick={this.drawCard}>
        Draw a card
      </button>
    );
    return (
      <section className="Deck">
        <h1>Dealer</h1>
        {!hasError ? drawCardHtml : errorHtml}
        {drawnCards.map((card) => (
          <Card
            imgSrc={card.images.svg}
            desc={`${card.value} of ${card.suit}`}
          />
        ))}
        {isDeckEmpty && generateNewDeckHtml}
      </section>
    );
  }
}

export default Deck;
