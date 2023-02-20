/* ------------------------------------------------------------------------ 
0. Todo display
-------------------------------------------------------------------------*/

//Empty array of objects with two properties, text and done. The text property is a string and the done property is a boolean. This array is used to store a list of to-do items.

const ul = document.querySelector('ul')

const todoList: { text: string, done: boolean, editMode: boolean } [] = [
    {
        text: 'Apprendre le Javascript',
        done: true,
        editMode: true
    },
    {
        text: 'Apprendre le typescript',
        done: false,
        editMode: false
    }
]

//The function takes a list of todos (todoList) and creates a HTML element for each todo.
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
    
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Supprimer'

    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        deleteToDoElement(index)
    })

    const editBtn = document.querySelector('button')
    editBtn.innerHTML = 'Editer'

    editBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        openEditMode(index)
    })


    li.innerHTML = `
        <span class="todo ${ todo.done ? 'done' : ''}"></span>
        <p>${todo.text}</p>
    `;

    li.addEventListener('click', (event) => {
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
const input = document.querySelector('input')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputValue: string = input.value
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
    todoList[index].editMode = !todoList[index].editMode
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
    saveBtn.innerHTML = 'Sauvegarder'

    const cancelBtn = document.createElement('button')
    cancelBtn.innerHTML = 'Annuler'

    saveBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        saveEditTodo(index, input)
        displayTodo()
    })

    cancelBtn.addEventListener('click', (event) => {
        event.stopPropagation()

        changeTodoStatut(index)
        displayTodo()
    })

    li.append(input, saveBtn, cancelBtn)
    
    return li
}

/* ------------------------------------------------------------------------ 
5. Edit mode button 
-------------------------------------------------------------------------*/

function openEditMode(index: number) {
    todoList[index].editMode = true
    displayTodo()
}


/* ------------------------------------------------------------------------ 
6. Save edit mode
-------------------------------------------------------------------------*/

function saveEditTodo(index: number, input: any) {
    const newInputValue = input.value
    todoList[index].text = newInputValue
    todoList[index].editMode = false
    displayTodo()
}