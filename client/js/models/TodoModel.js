class TodoModel {
    constructor({id, name, done}) {
        this.id = id
        this.name = name
        this.done = done
    }

    update(name, done) {
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
        const newTodo = new TodoModel({ id: resp.id, name: resp.name, done: false })
        this.todos.push(newTodo)
        return newTodo
    },

    async update(id, done) {
        const target = this.todos.find(todo => todo.id == id)
        const resp = await fetch(`/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ name: target.name, done })
        }).then((res) => res.json())
        target.update(target.name, done)
        return target
    },

    async delete(id) {
        await fetch(`/todos/${id}`, { method: 'DELETE' })
        this.todos = this.todos.filter((todo) => !(todo.id === parseInt(id)))
    }
}

export default TodoCollection