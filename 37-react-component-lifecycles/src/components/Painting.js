import React from 'react'

class Painting extends React.Component {

    state = {
        upvoted: false
    }

    componentWillUnmount() {
        console.log('painting unmounted', this.upvoteTimer)
        if (this.upvoteTimer) clearTimeout(this.upvoteTimer)
    }

    handleUpvote = (event) => {
        this.setState({ upvoted: true })
        this.props.upvote(event)
        this.upvoteTimer = setTimeout(() => this.setState({ upvoted: false }), 1000)
    }

    render = () => {

        const { upvote, title, image = "https://136636-395356-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/08/SunflowersSM-765x956.jpg", votes, handleClick } = this.props

        return (
            <div className="painting-card" onClick={handleClick}>
                <h2>{title}</h2>
                <p style={{ backgroundColor: this.state.upvoted ? 'green' : '' }} onClick={this.handleUpvote}>{votes}</p>
                <img alt="painting" src={image} />
            </div>
        )
    }
}

export default Painting
