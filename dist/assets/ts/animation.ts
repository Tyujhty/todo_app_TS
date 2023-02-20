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
    li.innerHTML = `
        <span class="todo ${ todo.done ? 'done' : ''}"></span>
        <p>${todo.text}</p>
        <button>Editer</button>
        <button>supprimer</button>
    `;

    return li
}

displayTodo()

export {};