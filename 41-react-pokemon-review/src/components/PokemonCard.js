import React from 'react'
import { Card } from 'semantic-ui-react'

const colorMap = {
  poison: 'purple',
  grass: 'green',
  fire: 'red',
  bug: 'olive',
  electric: 'yellow',
  water: 'blue',
  fairy: 'pink',
  normal: 'grey',
  ground: 'brown',
  fighting: 'teal',
  dragon: 'orange',
  ghost: 'violet'
}

class PokemonCard extends React.Component {

  state = {
    front: true
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ front: true })
    }
  }

  render() {

    const { name, sprites, stats, types } = this.props
    const hp = stats.find(stat => stat.name === "hp")
    const sprite = this.state.front ? sprites.front : sprites.back
    const type = types[0]
    const color = colorMap[type] || 'black'

    if (color === 'black') console.log(type)

    return (
      <Card color={color}>
        <div>
          <div className="image" onClick={() => this.setState({ front: !this.state.front })}>
            <img alt="oh no!" src={sprite} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp ? hp.value : 'HP NOT FOUND'} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
