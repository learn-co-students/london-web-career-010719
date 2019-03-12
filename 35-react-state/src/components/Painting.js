import React from 'react'

const Painting = ({ title, image, slug, handleClick }) => {
    return (
        <div className="painting-card" onClick={handleClick}>
            <h2>{title}</h2>
            <p>{slug}</p>
            <img alt="painting" src={image} />
        </div>
    )
}

export default Painting
