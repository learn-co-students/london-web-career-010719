import React from 'react'

const Painting = ({ title, image = "https://136636-395356-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/08/SunflowersSM-765x956.jpg", votes, handleClick }) => {
    return (
        <div className="painting-card" onClick={handleClick}>
            <h2>{title}</h2>
            <p>{votes}</p>
            <img alt="painting" src={image} />
        </div>
    )
}

export default Painting
