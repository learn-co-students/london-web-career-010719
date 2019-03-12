import React from 'react'
import Painting from './Painting';

const PaintingsList = (props) => {
    return (
        <div className="paintings-list">
            {
                props.paintings.map(painting => <Painting handleClick={() => props.selectPainting(painting)} {...painting} />)
            }
        </div>
    )
}

export default PaintingsList
