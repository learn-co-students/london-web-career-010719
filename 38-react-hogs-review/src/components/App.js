import React, { Component } from 'react';
import '../App.css';
import Nav from './Nav'
import hogs from '../porkers_data';
import { Container, Checkbox } from 'semantic-ui-react'
import HogsContainer from './HogsContainer'

const SORT_OPTIONS = {
  default: 'default',
  weight: 'weight',
  name: 'name'
}

const weightKey = "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"

class App extends Component {

  state = {
    hogs: hogs,
    showGreasedOnly: false,
    sortBy: SORT_OPTIONS.default,
    hiddenHogNames: []
  }

  toggleGreased = hog => {
    this.setState({
      hogs: hogs.map(h => {
        if (h.name !== hog.name) return h;
        h.greased = !h.greased;
        return h;
      })
    })
  }

  hideHog = (hog) => this.setState({ hiddenHogNames: [...this.state.hiddenHogNames, hog.name] })

  toggleGreaseFilter = () => this.setState({ showGreasedOnly: !this.state.showGreasedOnly })

  sortHogs = sortOption => (a, b) => {
    if (sortOption === SORT_OPTIONS.default) {
      return 0
    } else if (sortOption === SORT_OPTIONS.weight) {
      return a[weightKey] - b[weightKey]
    } else if (sortOption === SORT_OPTIONS.name) {
      return a.name.localeCompare(b.name)
    }
  }

  filterAndSortHogs = (hogs, filter, sortOption, hiddenHogNames) => hogs.filter(h => !hiddenHogNames.includes(h.name)).filter(h => filter ? h.greased : true).sort(this.sortHogs(sortOption))

  updateSortOption = event => {
    this.setState({
      sortBy: event.target.value
    })
  }

  render() {
    return (
      <Container>
        <div className="App">
          < Nav />
          <select onChange={this.updateSortOption}>
            {
              Object.values(SORT_OPTIONS).map(sortOption => <option value={sortOption}>{sortOption}</option>)
            }
          </select>
          <label>Show greased only</label>
          <input type="checkbox" onClick={this.toggleGreaseFilter} />
          <button onClick={() => this.setState({ hiddenHogNames: [] })}>Restore hidden hogs</button>
          <HogsContainer hideHog={this.hideHog} hogs={this.filterAndSortHogs(this.state.hogs, this.state.showGreasedOnly, this.state.sortBy, this.state.hiddenHogNames)} toggleGreased={this.toggleGreased} />
        </div>
      </Container>
    )
  }
}

export default App;
