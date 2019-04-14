import TodoController from "../controllers/TodoController.js";

class Todo {
    constructor({ id, name, done }) {
        this.id = id
        this.parent = document.querySelector('.todos')
        this.element = document.createElement('li')
        this.element.className = 'todo-item'

        // TODO: XSS対策
        this.element.innerHTML = `
            <label class="todo-toggle__container">
                <input
                    data-todo-id="${id}"
                    type="checkbox"
                    class="todo-toggle"
                    ${done ? 'checked' : ''}
                />
                <span class="todo-toggle__checkmark"></span>
            </label>
            <div class="todo-name">${name}</div>
            <div data-todo-id=${id} class="todo-remove-button">x</div>
        `
    }

    mount() {
        const done = (event) => {
            const id = parseInt(event.target.getAttribute('data-todo-id'), 10)
            const done = event.target.checked
            TodoController.update(id, done)
        }

        const remove = (event) => {
            const id = parseInt(event.target.getAttribute('data-todo-id'))
            TodoController.delete(id)
        }

        this.element.addEventListener('change', done)
        const removeButton = this.element.querySelector('.todo-remove-button')
        removeButton.addEventListener('click', remove)

        this.removeListener = () => {
            this.element.removeEventListener('change', done)
            this.element.querySelector('.todo-remove-button').removeEventListener('click', remove)
        }

        this.parent.appendChild(this.element)

    }

    unmount() {
        this.removeListener()
        this.parent.removeChild(this.element)
    }
}

export default Todo