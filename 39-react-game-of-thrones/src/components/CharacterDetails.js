import React from 'react'

const CharacterDetails = ({ name, aliases, aliasClickHandler, handleLikeClick, isLiked }) => {
    return (
        <div className="character-details">
            <h2>{name}</h2>
            {
                aliases[0].length === 0 ?
                    <div>Sorry, no aliases</div> :
                    <ul>
                        {
                            aliases.map((alias, i) => <li onClick={() => aliasClickHandler(alias)} key={i}>{alias}</li>)
                        }
                    </ul>
            }
            <button onClick={handleLikeClick}>{isLiked ? "UNLIKE" : "LIKE"}</button>
        </div>
    )
}

export default CharacterDetails