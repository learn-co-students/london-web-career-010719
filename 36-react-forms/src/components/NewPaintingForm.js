import React, { Component } from 'react';

class NewPaintingForm extends Component {

    state = {
        title: '',
        'artist-name': '',
        votes: 0
    }

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        this.props.addNewPainting({
            artist: {
                name: this.state['artist-name']
            },
            title: this.state.title,
            votes: this.state.votes
        })
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input name="title" placeholder="painting title" value={this.state.title} onChange={this.handleFieldChange} />
                <input name="artist-name" placeholder="artist name" value={this.state['artist-name']} onChange={this.handleFieldChange} />
                <input type="number" name="votes" placeholder="votes" value={this.state.votes} onChange={this.handleFieldChange} />
                <input type="submit" />
            </form>
        );
    }
}

export default NewPaintingForm;
