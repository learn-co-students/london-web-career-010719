import React, { Component } from "react";
import Card from "./Card";

class CardList extends Component {
  render() {
    return this.props.cards.map(url => <Card url={url} key={url} />);
  }
}

export default CardList;
