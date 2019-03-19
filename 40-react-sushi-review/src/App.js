import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    allSushis: [],
    eatenSushis: [],
    budget: Math.round(Math.random() * 40) + 20
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(allSushis => this.setState({ allSushis }))
  }

  eatSushi = sushi => {
    if (this.state.eatenSushis.includes(sushi.id)) return;
    if (this.state.budget < sushi.price) return this.setState({ insufficientFunds: true })

    this.setState({
      eatenSushis: [...this.state.eatenSushis, sushi.id],
      budget: this.state.budget - sushi.price
    })
  }

  addFunds = amount => {
    this.setState({ budget: this.state.budget + amount })
  }

  insufficientFundsMessage = () => (
    <div>
      <p>not enough funds</p>
      <button onClick={() => this.addFunds(5)}>Add $5</button>
    </div>
  )

  render() {

    const sushis = this.state.allSushis.map(sushi => {
      return {
        ...sushi,
        isEaten: this.state.eatenSushis.includes(sushi.id)
      }
    })

    return (
      <div className="app">
        {
          this.state.insufficientFunds && this.insufficientFundsMessage()
        }
        <SushiContainer eatSushi={this.eatSushi} sushis={sushis} />
        <Table eatenSushis={this.state.eatenSushis} budget={this.state.budget} />
      </div>
    );
  }
}

export default App;