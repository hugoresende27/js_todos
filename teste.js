const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {//submit eventlistener do formulario
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {//se existir texto que vai ser o value de input 
            todoEl.classList.toggle('feito')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {//click direito
            e.preventDefault()//ao clicar com botão direito não acontece nada

            todoEl.remove()
            updateLS()
        }) 

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('feito')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

/*
//para guardar no local storage, wrap em JSON stringify
localStorage.setItem('name', JSON.stringify.apply(obj))
JSON.parse(localStorage.getItem(obj))

*/