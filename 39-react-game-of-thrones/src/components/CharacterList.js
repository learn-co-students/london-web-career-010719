import React from 'react'

const CharacterList = ({ characters, handleCharacterClick }) => {
    return (
        <div className="character-list">
            {
                characters.map(character => <div onClick={() => handleCharacterClick(character)} key={character.url}>{character.name}</div>)
            }
        </div>
    )
}

export default CharacterList