class TodoForm {
    constructor() {
        this.elements = document.querySelector('.todo-form')
    }

    mount() {
        this.elements.addEventListener('submit', event => {
            event.preventDefault()
            console.log('a')
        })
    }
}

export default TodoForm