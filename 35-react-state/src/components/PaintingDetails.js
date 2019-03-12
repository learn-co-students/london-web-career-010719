import React from 'react'

const PaintingDetails = ({ title, slug, image, artist, votes, clearSelectedPainting }) => {
    return (
        <div className="painting-card">
            <h2>{title}</h2>
            <p>{slug}</p>
            <p>by {artist.name}</p>
            <p>votes {votes}</p>
            <img alt="painting" src={image} />
            <button onClick={clearSelectedPainting}>Back</button>
        </div>
    )
}

export default PaintingDetails
