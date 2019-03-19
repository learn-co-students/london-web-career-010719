import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      front: '',
      back: '',
      awaitingResponse: false
    }
  }

  handleSubmit = (event) => {
    console.log(this.state)
    this.setState({ awaitingResponse: true })
    this.props.addNewPokemon(this.state)
      .then(() => {
        this.setState({
          name: '',
          hp: '',
          front: '',
          back: '',
          awaitingResponse: false
        })
      })
  }

  handleChange = (event) => {
    // event.target.name // name hp fronUrl back

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleChange} value={this.state.hp} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="front" onChange={this.handleChange} value={this.state.front} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="back" onChange={this.handleChange} value={this.state.back} />
          </Form.Group>
          <Form.Button disabled={this.state.awaitingResponse} loading={this.state.awaitingResponse}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
