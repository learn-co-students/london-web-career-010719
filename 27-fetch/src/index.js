// get what's already on the page which we will need
const formEl = document.querySelector('#create-task-form')
const listEl = document.querySelector('#tasks')
const inputEl = document.querySelector('#new-task-description')
const url = "http://localhost:3000/tasks"

// add a task to the page
function addTask (text) {
	const taskEl = document.createElement('li')
	taskEl.className = 'task'

	taskEl.innerText = text
	listEl.appendChild(taskEl)
}

// add multiple tasks to the page
function addTasks (tasks) {
	localTasks = tasks
	localTasks.forEach(task => {
		addTask(task.text)
	})
}



// listen to form submission
formEl.addEventListener('submit', event => {
	event.preventDefault()

	const text = inputEl.value

	
	createTask(text)
		.then(task => addTask(task.text))

	formEl.reset()
})

document.addEventListener('click', event => {
	if (event.target.className === 'task') {
		event.target.remove()
	}
})

// get tasks from server
// returns Promise(array)
function getTasks () {
	return fetch(url)
		.then(resp => resp.json())
}

// create a task on the server
function createTask (text) {

	const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
					"text": text
			})
	}

	return fetch(url, options)
		.then(resp => resp.json())

}

getTasks()
	.then(addTasks)