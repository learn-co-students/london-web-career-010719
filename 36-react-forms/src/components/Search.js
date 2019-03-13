import React from 'react'

const Search = (props) => {
    return (
        <input
            onChange={props.handleChange}
            placeholder="enter your painring namne"
        />
    )
}

export default Search
