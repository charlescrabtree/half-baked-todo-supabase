import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

let todoArray = [];

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);
    const todo = data.get('todo');
    console.log(todo);

    const newTodo = await createTodo(todo);
    todoArray.push(newTodo);
    console.log(todoArray);
    todoForm.reset();

    displayTodos();
});

// create todo state

// add async complete todo handler function
    // call completeTodo
    // swap out todo in array
    // call displayTodos



async function displayTodos() {
    // clear the container (.innerHTML = '')
    const todos = await getTodos();
    // display the list of todos, 
    todosEl.textContent = '';
    for (let todo of todos) {
        const renderedTodo = renderTodo(todo);
        renderedTodo.addEventListener('click', () => {
            completeTodo(todo.id);
            
        });
        todosEl.append(renderedTodo);
    }
          // call render function, pass in state and complete handler function!
          // append to .todos
}

// add page load function
    // fetch the todos and store in state
    // call displayTodos

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // modify state to match
    todoArray = [];
    // re displayTodos
    displayTodos();
});

displayTodos();