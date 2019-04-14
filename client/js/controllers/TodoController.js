import TodoCollection from '../models/TodoModel.js'
import Todo from '../views/Todo.js'
import TodoForm from '../views/TodoForm.js';

const TodoController = {
    views:[],

    async render() {
        const todos = await TodoCollection.read()
        this.render.views = todos.map(todo => {
            const view = new Todo({ ...todo })
            view.mount()
            return view
        })

        const form = new TodoForm()
        form.mount()
    },

    async create(name) {
        const todo = await TodoCollection.create(name)
        const view = new Todo({ ...todo })
        view.mount()
    },

    async update(id, done) {
        await TodoCollection.update(id, done)
    }
}

export default TodoController