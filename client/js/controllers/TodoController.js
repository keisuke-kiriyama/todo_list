import TodoCollection from '../models/TodoModel.js'
import Todo from '../views/Todo.js'
import TodoForm from '../views/TodoForm.js';

const TodoController = {
    views:[],

    async render() {
        const todos = await TodoCollection.read()
        this.views = todos.map(todo => {
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
        this.views.push(view)
        view.mount()
    },

    async update(id, done) {
        await TodoCollection.update(id, done)
    },

    async delete(id) {
        await TodoCollection.delete(id)
        this.unmount(id)
    },

    unmount(id) {
        const view = this.views.find(v => v.id === parseInt(id, 10))
        console.log(this.views)
        if (view) view.unmount()
        this.views = this.views.filter(v => !(v.id === parseInt(id, 10)))
    }

}

export default TodoController