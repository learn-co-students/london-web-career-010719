// get all the stuff that's on the page that we need
const filterEl = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')

const state = {
  filter: false,
  dogs: []
}

// add a single dog tag to the dog bar
function addDogTag (dog) {
	const dogTag = document.createElement('span')
	dogTag.innerText = dog.name
  dogBarEl.appendChild(dogTag)
  
  dogTag.addEventListener('click', () => displayDogInfo(dog))
}

// add multiple dog tags to the dog bar
function addDogTags (dogs) {
  dogBarEl.innerHTML = ''
	dogs.forEach(dog => addDogTag(dog))
}

// display a dog's info
function displayDogInfo (dog) {
	dogInfoEl.innerHTML = `
		<img src="${dog.image}">
 		<h2>${dog.name}</h2>
 		<button id='toggle-good-dog'>${dog.isGoodDog ? 'Good' : 'Bad'} Dog!</button>
  `
  const toggleBtn = dogInfoEl.querySelector('#toggle-good-dog')
  toggleBtn.addEventListener('click', () => {
    toggleGoodDog(dog)
    updateDog(dog)
  })
}

// toggle dog status and refresh button
function toggleGoodDog (dog) {
  dog.isGoodDog = !dog.isGoodDog
  const toggleBtn = dogInfoEl.querySelector('#toggle-good-dog')
  toggleBtn.innerText = `${dog.isGoodDog ? 'Good' : 'Bad'} Dog!`
  toggleDogTags()
}

// turn filter on
function addFilterListener () {
  filterEl.addEventListener('click', () => {
    state.filter = !state.filter
    filterEl.innerText = `Filter good dogs: ${state.filter ? 'ON' : 'OFF'}`
    toggleDogTags()
  })
}

// update the dog bar
function toggleDogTags () {
  const filteredDogs = state.filter
    ? state.dogs.filter(dog => dog.isGoodDog)
    : state.dogs
  addDogTags(filteredDogs)
}

// stuff to do when the page loads
function initialize () {
  getDogs()
    .then(dogs => {
      state.dogs = dogs
      addDogTags(state.dogs)
    })
  addFilterListener()
}

initialize()
