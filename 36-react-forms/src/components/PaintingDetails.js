import React from 'react'

const PaintingDetails = ({ title, slug, image, artist, votes, clearSelectedPainting, upvote }) => {
    return (
        <div className="painting-details">
            <h2>{title}</h2>
            <p>by {artist.name}</p>
            <p onClick={upvote}>votes {votes}</p>
            <img alt="painting" src={image} />
            <br />
            <button onClick={clearSelectedPainting}>Back</button>
        </div>
    )
}

export default PaintingDetails
