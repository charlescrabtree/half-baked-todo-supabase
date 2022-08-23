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

// create todo state
// let todoArray = [];

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);
    const todo = data.get('todo');

    await createTodo(todo);
    
    todoForm.reset();

    displayTodos();
});



// add async complete todo handler function
async function handleComplete(todo) {
    await completeTodo(todo.id);
    // swap out todo in array
    // call displayTodos
    displayTodos();
}


async function displayTodos() {
    // clear the container (.innerHTML = '')
    todosEl.innerHTML = '';
    const todos = await getTodos();
    for (let todo of todos) {
        const todoList = renderTodo(todo, handleComplete);
        todosEl.append(todoList);
    }
          // call render function, pass in state and complete handler function!
          // append to .todos
}

// add page load function
async function onLoad() {
    await getTodos();
    displayTodos();
    handleComplete();
}
    // fetch the todos and store in state
    // call displayTodos
onLoad();

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // modify state to match
    // re displayTodos
    displayTodos();
});

