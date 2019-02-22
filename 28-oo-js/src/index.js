// get what's already on the page which we will need
const formEl = document.querySelector('#create-task-form')
const inputEl = document.querySelector('#new-task-description')
const url = "http://localhost:3000/tasks"
const taskList = new TaskList()

// listen to form submission
formEl.addEventListener('submit', event => {
	event.preventDefault()

	const text = inputEl.value

	
	createTask(text)
		.then(task => taskList.createTask(task))

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
	.then(tasks => taskList.createTasks(tasks))