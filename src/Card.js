import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    const rand = Math.random();
    const sign = rand > 0.5 ? '-' : '';
    const xPos = `-${50 + rand * 10}%`;
    const yPos = `${sign}${rand * 6}px`;
    const angle = `${sign}${rand * 40}deg`;
    this._transform = `translate(${xPos}, ${yPos}) rotate(${angle})`;
  }

  render() {
    const { imgSrc, desc, styleObj } = this.props;
    return (
      <img
        className="Card"
        src={imgSrc}
        alt={desc}
        style={{ transform: this._transform }}
      />
    );
  }
}

export default Card;
