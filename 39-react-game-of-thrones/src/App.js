import React, { Component } from 'react';
import './App.css';
import API from './adapters/API'
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';

class App extends Component {

  state = {
    characters: [],
    selectedCharacterUrl: undefined,
    likedCharacters: [],
    filterType: 'all'
  }

  componentDidMount() {
    API.getAllCharacters()
      .then(characters => this.setState({ characters }))
  }

  selectCharacter = character => {
    this.setState({
      selectedCharacterUrl: character.url
    })
  }

  findCharacterByUrl = (url) => this.state.characters.find(char => char.url === url)

  swapAliasWithName = (alias, selectedCharacter) => {
    this.setState({
      characters: this.state.characters.map(character => {
        if (character.url !== selectedCharacter.url) return character

        const originalName = character.name
        character.name = alias
        character.aliases = character.aliases.map(a => a !== alias ? a : originalName)
        return character
      })
    })
  }

  toggleLikednessOfCharacter = character => {
    if (this.state.likedCharacters.includes(character.url)) {
      this.setState({
        likedCharacters: this.state.likedCharacters.filter(url => url !== character.url)
      })
    } else {
      this.setState({
        likedCharacters: [...this.state.likedCharacters, character.url]
      })
    }
  }

  getLikedCharacters = () => this.state.characters.filter(character => this.state.likedCharacters.includes(character.url))

  filterCharacters = () => {
    if (this.state.filterType === 'all') return this.state.characters
    if (this.state.filterType === 'dead') return this.state.characters.filter(character => character.died.length > 0)
    if (this.state.filterType === 'alive') return this.state.characters.filter(character => character.died.length === 0)
  }

  render() {

    const selectedCharacter = this.findCharacterByUrl(this.state.selectedCharacterUrl)
    const likedCharacters = this.getLikedCharacters()

    return (
      <div className="App">
        <div>
          <select onChange={(event) => this.setState({ filterType: event.target.value })}>
            <option value="all">All</option>
            <option value="dead">Dead</option>
            <option value="alive">Alive</option>
          </select>
        </div>

        <CharacterList handleCharacterClick={this.selectCharacter} characters={this.filterCharacters()} />
        <CharacterList handleCharacterClick={this.selectCharacter} characters={this.state.characters.filter(character => character.aliases[0].length > 0)} />
        {
          selectedCharacter && <CharacterDetails
            handleLikeClick={() => this.toggleLikednessOfCharacter(selectedCharacter)}
            aliasClickHandler={(alias) => this.swapAliasWithName(alias, selectedCharacter)}
            isLiked={this.state.likedCharacters.includes(selectedCharacter.url)}
            {...selectedCharacter}
          />
        }
        <CharacterList handleCharacterClick={this.selectCharacter} characters={likedCharacters} />
      </div>
    );
  }
}

export default App;
