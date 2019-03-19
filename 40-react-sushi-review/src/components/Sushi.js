import React, { Fragment } from 'react'

const Sushi = ({ img_url, name, price, isEaten, onClick }) => {
  return (
    <div className="sushi">
      <div className="plate"
        onClick={onClick}>
        {
          /* Tell me if this sushi has been eaten! */
          isEaten ?
            null
            :
            <img src={img_url} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  )
}

export default Sushi