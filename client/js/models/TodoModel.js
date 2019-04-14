class TodoModel {
    constructor({id, name, done}) {
        this.id = id
        this.name = name
        this.done = done
    }
}

const TodoCollection = {
    todos: [],

    async read() {
        const resp = await fetch('/todos').then((res) => res.json())
        this.todos = resp.todos.map((todo) => {
            return new TodoModel({ ...todo })
        })
        return this.todos
    },

    async create(name) {
        const resp = await fetch('/todos', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ name }),
        }).then((res) => res.json())
        const newTodo = new TodoModel({ id: resp.id, name: resp.name })
        this.todos.push(newTodo)
        return newTodo
    }
}

export default TodoCollection