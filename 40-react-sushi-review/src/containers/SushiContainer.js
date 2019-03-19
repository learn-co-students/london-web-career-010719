import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

class SushiContainer extends React.Component {

  state = {
    sushiIndexes: [0, 1, 2, 3]
  }

  getSushiPage = () => this.props.sushis.filter((s, i) => this.state.sushiIndexes.includes(i))

  nextSushiIndex = (i) => i + 4 < this.props.sushis.length ? i + 4 : (i + 4) - (this.props.sushis.length)

  nextPageOfSushis = () => this.setState({ sushiIndexes: this.state.sushiIndexes.map(this.nextSushiIndex) })

  render = () => {
    return (
      <Fragment>
        <div className="belt">
          {
            this.getSushiPage().map(sushi => <Sushi onClick={() => this.props.eatSushi(sushi)} {...sushi} />)
          }
          <MoreButton onClick={this.nextPageOfSushis} />
        </div>
      </Fragment>
    )
  }
}

export default SushiContainer