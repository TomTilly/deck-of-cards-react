import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    const { imgSrc, desc, styleObj } = this.props;
    return <img className="Card" src={imgSrc} alt={desc} style={styleObj} />;
  }
}

export default Card;
