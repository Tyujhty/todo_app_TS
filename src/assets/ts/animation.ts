/* ------------------------------------------------------------------------ 
0. Todo display
-------------------------------------------------------------------------*/

//Empty array of objects with two properties, text and done. The text property is a string and the done property is a boolean. This array is used to store a list of to-do items.

const ul = document.querySelector('ul')

const todoList: { text: string, done: boolean } [] = [
    {
        text: 'Apprendre le Javascript',
        done: true
    },
    {
        text: 'Apprendre le typescript',
        done: false
    }
]

//The function takes a list of todos (todoList) and creates a HTML element for each todo.
function displayTodo() {
    let todosNode = todoList.map((todo, index) => {
        return createTodoElementHtml(todo, index)
    })
    ul.innerHTML = ''
    ul.append(...todosNode)
}

function createTodoElementHtml(todo: any, index: number) {
    const li = document.createElement('li')
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Supprimer'

    deleteBtn.addEventListener('click', (event) => {
        deleteToDoElement(index)
        displayTodo()
    })

    li.innerHTML = `
        <span class="todo ${ todo.done ? 'done' : ''}"></span>
        <p>${todo.text}</p>
        <button>Editer</button>
    `;

    li.addEventListener('click', (event) => {
        changeTodoStatut(index)
        displayTodo()
    })

    li.appendChild(deleteBtn)

    return li
}

displayTodo()

export {};

/* ------------------------------------------------------------------------ 
1. Add toDo
-------------------------------------------------------------------------*/

const form = document.querySelector('form')
const input = document.querySelector('input')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputValue: string = input.value
    input.value = ''
    addTodoElement(inputValue)
    displayTodo()
})

//This code creates a new list item element with the given text (input) and appends it.

function addTodoElement(text: any) {
    todoList.push(
        {
            text,
            done: false
        }
    )
}

/* ------------------------------------------------------------------------ 
2. delete toDo 
-------------------------------------------------------------------------*/

function deleteToDoElement(index: number) {
    todoList.splice(index, 1)
}

/* ------------------------------------------------------------------------ 
3. Change done statut 
-------------------------------------------------------------------------*/

function changeTodoStatut(index: number) {
    
    //The code takes the index of the item in the todo list and sets the "done" property to the opposite of what it currently is.
    todoList[index].done = !todoList[index].done
}