import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { imgSrc, desc } = this.props;
    return <img className="Card" src={imgSrc} alt={desc} />;
  }
}

export default Card;
