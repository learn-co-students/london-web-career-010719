// SERVER STUFF

// get dogs from the server
function getDogs () {
	return fetch('http://localhost:3000/pups')
		.then(resp => resp.json())
}

// update dog on server
function updateDog (dog) {
	return fetch(`http://localhost:3000/pups/${dog.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dog)
	}).then(resp => resp.json())
}
