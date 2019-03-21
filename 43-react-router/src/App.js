import React, { Component } from "react";
import Card from "./Card";
import CardList from "./CardList";
import { Route, Switch, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    const apiUrl = `http://shibe.online/api/shibes?count=50&urls=true`;
    fetch(apiUrl)
      .then(data => data.json())
      .then(cards => this.setState({ cards }));
  }

  regenerateCardUrl = cardId => `https://cdn.shibe.online/shibes/${cardId}.jpg`;

  render() {
    return (
      <div>
        <h1>The famous pictures website where you can see pictures</h1>
        <Switch>
          <Route exact path="/" component={() => <h1>welcome home</h1>} />
          <Route
            path="/cards/:id"
            component={routerProps => {
              const cardUrl = this.regenerateCardUrl(
                routerProps.match.params.id
              );
              return (
                <div>
                  <Link to="/cards">go back to see all the dogs</Link>
                  <Card url={cardUrl} />
                </div>
              );
            }}
          />
          <Route
            path="/cards"
            component={() => <CardList cards={this.state.cards} />}
          />
          <Route path="/" component={() => <h1>404 </h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
