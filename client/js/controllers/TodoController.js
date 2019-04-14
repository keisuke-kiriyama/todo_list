import TodoCollection from '../models/TodoModel.js'
import Todo from '../views/Todo.js'

const TodoController = {
    views:[],

    async render() {
        const todos = await TodoCollection.read()
        this.render.views = todos.map(todo => {
            const view = new Todo({ ...todo })
            view.mount()
            return view
        })
    },
}

export default TodoController