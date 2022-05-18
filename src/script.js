class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        this.input = document.querySelector('#todo_input');

        this.el.addEventListener('click', (event) => {
            let action = event.target.dataset.action;
            let todoId = event.target.closest('li').dataset.id;

            switch (action) {
                case 'set-status':
                    this.changeStatus(todoId);
                    break;
                case 'delete-task':
                    this.removeTodo(todoId);
                    break;
                case 'moveUp':
                    this.moveUp(todoId);
                    break;
                case 'moveDown':
                    this.moveDown(todoId);
                    break;
            }
        })

        document.querySelector('.todoForm').addEventListener('click', (event) => {
            let action = event.target.dataset.action;

            switch (action) {
                case 'create-task':
                    if (this.input.value !== '') {
                        this.addTodo(new Task(this.input.value, false));
                    }
                    break;
                case 'find-task':
                    if (this.input.value !== '') {
                        this.findTasks(this.input.value);
                    }
                    break;
            }
        })
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.render(this.todos);
    }

    removeTodo(id) {
        this.todos = this.todos.filter((el) => el.id !== id);
        this.render(this.todos);
    }

    getTodos() {
        return this.todos;
    }

    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
        this.render(this.todos);
    }

    render(todos = []) {
        let list = '';
        // todos = this.todos;
        for (let el of todos) {
            if (!el) {
                return;
            }
            let status = !el.status ? 'in-progress' : 'done';
            list += `<li class="${status}" data-id="${el.id}">${el.value}<button data-action="set-status">Change status</button><button data-action="delete-task">Delete</button><button data-action="moveUp">moveUp</button><button data-action="moveDown">moveDown</button></li>`;
        }
        this.el.innerHTML = list;
    }

    findTasks(text) {
        this.filteredTodos = this.todos.filter((el) => el.value.includes(text))
        this.render(this.filteredTodos);
    }

    moveUp(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        if (index > 0) {
            let el = this.todos[index];
            this.todos[index] = this.todos[index - 1];
            this.todos[index - 1] = el;
        }
        this.render(this.todos);
    }

    moveDown(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        if (index !== -1 && index < this.todos.length - 1) {
            let el = this.todos[index];
            this.todos[index] = this.todos[index + 1];
            this.todos[index + 1] = el;
        }
        this.render(this.todos);
    }
}

class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

let list = document.getElementById('list');

let todo1 = new TodoList(list);
todo1.addTodo(new Task('9345', true));
todo1.addTodo(new Task('2945hv', false));
todo1.addTodo(new Task('send letter', false));
todo1.addTodo(new Task('do homework', false));
todo1.addTodo(new Task('hiking', true));
console.log(todo1.getTodos());