const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

const addToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

const baseURL = 'http://localhost:3000'
const toysURL = baseURL + '/toys'

let addToy = false

const state = {
  toys: []
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// add a single toy to the page
function appendToy (toy) {
	const toyDiv = document.createElement('div')
	toyDiv.className = 'card'

	toyDiv.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p class='toy-likes'>${toy.likes} Likes</p>
          <button class="like-btn">Like <3</button>
  `
  
  const toyBtn = toyDiv.querySelector('.like-btn')
  const toyLikes = toyDiv.querySelector('.toy-likes')

  toyBtn.addEventListener('click', () => {
    toy.likes++
    updateToy(toy)
      .then(toy => {
        toyLikes.innerText = `${toy.likes} Likes`
      })
      .catch(() => {
        toy.likes--
      })
  })
  
	toyCollection.appendChild(toyDiv)
}

// add multiple toys to the page
function appendToys (toys) {
  toys.forEach(appendToy)
}

// get toys from server
function getToys () {
  return fetch(toysURL)
    .then(resp => resp.json())
}

// create toy on server
function createToy (toy) {
  return fetch(toysURL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

// update toy on server
function updateToy (toy) {
	return fetch(`${toysURL}/${toy.id}`, {
		method: 'PATCH',
		headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
		body: JSON.stringify(toy)
	}).then(resp => resp.json())
}

function addListenerToToyForm () {
  addToyForm.addEventListener('submit', event => {
    event.preventDefault()
    const toy = {
      name: addToyForm.name.value,
      image: addToyForm.image.value,
      likes: 0
    }

    createToy(toy)
      .then(toy => {
        state.toys.push(toy)
        appendToy(toy)
      })

    addToyForm.reset()
  })
}

function init () {
  getToys()
    .then(toys => {
      state.toys = toys
      appendToys(state.toys)
    })
  addListenerToToyForm()
}

init()
