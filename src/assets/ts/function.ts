/* ------------------------------------------------------------------------ 
0. Todo display
-------------------------------------------------------------------------*/

const ul = document.querySelector('ul')

//Empty array of objects with two properties, text and done. The text property is a string and the done property is a boolean. This array is used to store a list of to-do items.
const todoList: { text: string, done: boolean, editMode: boolean } [] = [
    {
        text: 'Apprendre le Javascript',
        done: true,
        editMode: false
    },
    {
        text: 'Apprendre Typescript',
        done: false,
        editMode: false
    }
]

//This code is a function that displays a list of todos. It takes in an array of todos (todoList) and maps through them. For each todo, it checks if it is in edit mode.Then it creates a HTML element for each todo.
function displayTodo() {
    const todosNode = todoList.map((todo, index) => {
        if(todo.editMode) {
            return createEditTodoElement(todo, index)
        } else {
            return createTodoElementHtml(todo, index)
        }
    })
    ul.innerHTML = ''
    ul.append(...todosNode)
}

function createTodoElementHtml(todo: any, index: number) {
    const li = document.createElement('li')
    const span = document.querySelector('span')
    
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.innerHTML = 'Delete'

    const editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'

    editBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        openEditMode(index)
    })
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        deleteToDoElement(index)
    })

    li.innerHTML = `
        <span class="todo ${ todo.done ? 'done' : ''}"></span>
        <p>${todo.text}</p>
    `;

    li.addEventListener('click', (event) => {
        event.stopPropagation()

        changeTodoStatut(index)
    })

    li.append(editBtn, deleteBtn)

    return li
}

displayTodo()

export {};

/* ------------------------------------------------------------------------ 
1. Add toDo
-------------------------------------------------------------------------*/

const form = document.querySelector('form')
const input: any = document.querySelector('.inputForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputValue = input.value
    input.value = ''
    addTodoElement(inputValue)
})

//This code creates a new list item element with the given text (input) and appends it.

function addTodoElement(text: any) {
    todoList.push(
        {
            text,
            done: false,
            editMode: false
        }
    )
    displayTodo()
}

/* ------------------------------------------------------------------------ 
2. delete toDo 
-------------------------------------------------------------------------*/

function deleteToDoElement(index: number) {

    // This code removes an item from the todoList array at the specified index. The first argument (index) is the index of the item to be removed, and the second argument (1) is the number of items to be removed.
    todoList.splice(index, 1)
    displayTodo()
}

/* ------------------------------------------------------------------------ 
3. Change done statut 
-------------------------------------------------------------------------*/

function changeTodoStatut(index: number) {

    //The code takes the index of the item in the todo list and sets the "done" property to the opposite of what it currently is.
    todoList[index].done = !todoList[index].done
    displayTodo()
}

/* ------------------------------------------------------------------------ 
4. Edit toDo
-------------------------------------------------------------------------*/

function createEditTodoElement(todo: any, index: number) {
    const li = document.createElement('li')
    
    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo.text
    
    const saveBtn = document.createElement('button')
    saveBtn.innerHTML = 'Save'

    const cancelBtn = document.createElement('button')
    cancelBtn.className = 'btn-danger'
    cancelBtn.innerHTML = 'Cancel'

    saveBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        saveEditTodo(index, input)
    })

    cancelBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        openEditMode(index)
    })

    li.append(input,cancelBtn, saveBtn)
    
    return li
}

/* ------------------------------------------------------------------------ 
5. Edit mode button 
-------------------------------------------------------------------------*/

function openEditMode(index: number) {
    todoList[index].editMode = !todoList[index].editMode
    displayTodo()
}

/* ------------------------------------------------------------------------ 
6. Save edit mode
-------------------------------------------------------------------------*/

//Sets the text of the todoList item at the given index to the new input value, sets the editMode of the todoList item at the given index to false, and calls the displayTodo() function.

function saveEditTodo(index: number, input: any) {
    const newInputValue = input.value
    todoList[index].text = newInputValue
    todoList[index].editMode = false
    displayTodo()
}