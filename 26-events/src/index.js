// get what's already on the page which we will need
const formEl = document.querySelector('#create-task-form')
const listEl = document.querySelector('#tasks')
const inputEl = document.querySelector('#new-task-description')


// add a task to the page
function addTask (text) {
	const taskEl = document.createElement('li')
	taskEl.className = 'task'

	taskEl.innerText = text
	listEl.appendChild(taskEl)
}

// listen to form submission
formEl.addEventListener('submit', event => {
	event.preventDefault()

	const text = inputEl.value

	addTask(text)

	formEl.reset()
})

document.addEventListener('click', event => {
	if (event.target.className === 'task') {
		event.target.remove()
	}
})

const parentEl = document.querySelector('#parent')
const childEl = document.querySelector('#child')
const grandchildEl = document.querySelector('#grandchild')

parentEl.addEventListener('click', event => {
	console.log("I'm the parent!")
})

childEl.addEventListener('click', event => {
	event.stopPropagation()
	console.log("I'm the child!")
})

grandchildEl.addEventListener('click', event => {
	console.log("I'm the grandchild!")
})

document.addEventListener('click', event => {
	console.log("I'm the document!")
})
