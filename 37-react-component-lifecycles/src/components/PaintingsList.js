import React from 'react'
import Painting from './Painting';

const PaintingsList = (props) => {
    const upvoteHandler = (painting) => (event) => {
        event.stopPropagation()
        props.upvote(painting)
    }
    return (
        <div className="paintings-list">
            {
                props.paintings.map(painting => <Painting upvote={upvoteHandler(painting)} key={painting.id} handleClick={() => props.selectPainting(painting)} {...painting} />)
            }
        </div>
    )
}

export default PaintingsList
