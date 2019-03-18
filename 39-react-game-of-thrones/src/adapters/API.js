const houseURL = 'https://anapioficeandfire.com/api/houses/362'

const getAllCharacters = () => {
    return fetch(houseURL)
        .then(res => res.json())
        .then(data => {
            return Promise.all(
                data.swornMembers.map(memberURL => fetch(memberURL).then(res => res.json()))
            )
        })
        .catch(error => {
            // display an error message to the user
        })
}


export default {
    getAllCharacters
}