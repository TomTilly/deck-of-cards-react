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
    };
  }

  componentDidMount() {
    const { newDeckUrl } = this.props;
    fetch(newDeckUrl)
      .then(checkStatusAndParse)
      .then(({ deck_id: deckID }) => {
        this.setState({ deckID });
      })
      .catch((err) => {
        this.setState({ hasError: true });
        console.log(err);
      });
  }

  render() {
    const { isDeckEmpty, hasError } = this.state;
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
      <button className="Deck-drawBtn" type="button">
        Draw a card
      </button>
    );
    return (
      <section className="Deck">
        <h1>Dealer</h1>
        {hasError ? errorHtml : drawCardHtml}
        <Card src="" desc="desc" />
        {isDeckEmpty && generateNewDeckHtml}
      </section>
    );
  }
}

export default Deck;
