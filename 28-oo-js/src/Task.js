class Task {
  constructor (task) {
    this.id = task.id
    this.text = task.text
    this.el = this.create()
  }

  create () {
    const liEl = document.createElement('li')
    liEl.innerText = this.text
    liEl.id = `task-${this.id}`
    return liEl
  }

  remove () {
    this.el.remove()
  }

  updateText (text) {
    this.el.innerText = text
    this.text = text
  }

}