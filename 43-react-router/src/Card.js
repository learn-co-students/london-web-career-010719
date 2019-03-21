import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  getCardPictureId = cardUrl => {
    const splitUrl = cardUrl.split("/");
    const id = splitUrl[splitUrl.length - 1].split(".")[0];
    return id;
  };

  render() {
    const cardId = this.getCardPictureId(this.props.url);
    return (
      <Link to={`/cards/${cardId}`}>
        <div
          style={{
            border: "5px black solid",
            margin: "10px",
            width: "50%",
            height: "20%",
            paddingBottom: "15px"
          }}
        >
          <h3>this image is legally owned by superCute inc.</h3>
          <img style={{ width: "100%" }} src={this.props.url} />
        </div>
      </Link>
    );
  }
}

export default Card;
