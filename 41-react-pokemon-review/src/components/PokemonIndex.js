import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const pokemonPath = 'http://localhost:3000/pokemon'


class PokemonPage extends React.Component {

  state = {
    allPokemons: [],
    searchTerm: '',
    types: ['all'],
    filterType: 'all'
  }

  componentDidMount() {
    fetch(pokemonPath)
      .then(res => res.json())
      .then(allPokemons => {

        this.setState({
          allPokemons,
          types: ['all', ...(new Set(allPokemons.map(pokemon => pokemon.types).flat()))]
        })
      })
  }

  displayPokemons = () => this.state.allPokemons
    .filter(pokemon => pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    .filter(pokemon => this.state.filterType === 'all' ? true : (pokemon.types ? pokemon.types : []).includes(this.state.filterType))

  handleSearchChange = (event, { value }) => {
    this.setState({ searchTerm: value })
  }

  addNewPokemon = ({ name, hp, front, back }) => {
    const newPokemonObject = {
      name,
      stats: [
        {
          name: 'hp',
          value: hp
        }
      ],
      types: [],
      sprites: {
        front,
        back
      }
    }
    return fetch(pokemonPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemonObject)
    })
      .then(res => res.json())
      .then(pokemon => this.setState({ allPokemons: [...this.state.allPokemons, pokemon] }))
  }

  handleTypeFilterChange = (event) => {
    this.setState({ filterType: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <select onChange={this.handleTypeFilterChange}>
          {
            this.state.types.map(type => <option value={type}>{type}</option>)
          }
        </select>
        <br />
        <Search onSearchChange={this.handleSearchChange} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.displayPokemons()} />
        <br />
        <PokemonForm addNewPokemon={this.addNewPokemon} />
      </div>
    )
  }
}

export default PokemonPage
