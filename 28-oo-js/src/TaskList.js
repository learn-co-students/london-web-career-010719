class TaskList {
  constructor () {
    this.tasks = []
    this.listEl = document.querySelector('#tasks')
  }

  createTask (task) {
    const taskInstance = new Task(task)
    this.addTask(taskInstance)
    this.tasks.push(taskInstance)
  }

  createTasks (tasks) {
    tasks.forEach(task => this.createTask(task))
  }

  addTask (taskInstance) {
    this.listEl.appendChild(taskInstance.el)
  }

  removeTask (id) {
    const task = this.tasks.find(task => task.id === id)
    this.tasks = this.tasks.filter(task => task.id !== id)
    task.remove()
  }

}