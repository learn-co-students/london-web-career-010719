import React, { Component } from 'react';
import Header from './components/Header'
import './App.css';
import PaintingsList from './components/PaintingsList';
import Search from './components/Search';
import artworks from './artworks'
import PaintingDetails from './components/PaintingDetails';

class App extends Component {

  state = {
    paintings: [...artworks],
    searchTerm: '',
    selectedPainting: undefined
  }

  handlePaintingSearchQueryChange = event => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterPaintings = (paintings, searchTerm) => {
    return paintings.filter(painting => painting.title.includes(searchTerm))
  }


  selectPainting = (painting) => {
    this.setState({
      selectedPainting: painting
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search handleChange={this.handlePaintingSearchQueryChange} />
        {
          this.state.selectedPainting ?
            <PaintingDetails clearSelectedPainting={() => this.selectPainting(undefined)} {...this.state.selectedPainting} /> :
            <PaintingsList selectPainting={this.selectPainting} paintings={this.filterPaintings(this.state.paintings, this.state.searchTerm)} />

        }
      </div>
    );
  }
}

export default App;
