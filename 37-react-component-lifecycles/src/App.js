import React, { Component } from 'react';
import Header from './components/Header'
import './App.css';
import PaintingsList from './components/PaintingsList';
import Search from './components/Search';
import PaintingDetails from './components/PaintingDetails';
import NewPaintingForm from './components/NewPaintingForm';

class App extends Component {

  state = {
    paintings: [],
    searchTerm: '',
    selectedPaintingId: undefined,
    filterByVotes: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/artworks')
      .then(res => res.json())
      .then(paintings => this.setState({ paintings }))
  }


  handlePaintingSearchQueryChange = event => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterPaintings = (paintings, searchTerm) => {
    return paintings
      .filter(painting => this.state.filterByVotes ? painting.votes < 50 : true)
      .filter(painting => painting.title.includes(searchTerm))
  }


  selectPainting = (painting) => {
    this.setState({
      selectedPaintingId: painting.id
    })
  }

  addNewPainting = (painting) => {
    this.setState({
      paintings: [...this.state.paintings, painting]
    })
  }

  upvotePainting = (paintingToUpvote) => {
    this.setState({
      paintings: this.state.paintings.map(painting => {
        if (painting.id !== paintingToUpvote.id) return painting;
        painting.votes++
        return painting;
      })
    })
  }

  selectedPainting = () => this.state.paintings.find(p => p.id === this.state.selectedPaintingId)

  renderFilterCheckbox = () => {
    return (
      <div>
        <label>filter less than 50 votes</label>
        <input type="checkbox" checked={this.state.filterByVotes} onChange={event => this.setState({ filterByVotes: event.target.checked })} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Header />
        {
          !this.state.selectedPaintingId && <Search handleChange={this.handlePaintingSearchQueryChange} />
        }
        {
          !this.state.selectedPaintingId && this.renderFilterCheckbox()
        }
        {
          !this.state.selectedPaintingId && <NewPaintingForm addNewPainting={this.addNewPainting} />
        }

        {
          this.state.selectedPaintingId ?
            <PaintingDetails upvote={() => this.upvotePainting(this.selectedPainting())} clearSelectedPainting={() => this.setState({ selectedPaintingId: undefined })} {...this.selectedPainting()} /> :
            <PaintingsList upvote={this.upvotePainting} selectPainting={this.selectPainting} paintings={this.filterPaintings(this.state.paintings, this.state.searchTerm)} />
        }
      </div>
    );
  }
}

export default App;
