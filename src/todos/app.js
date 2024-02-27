import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  ClearCompletedButton: '.clear-completed',
  TodoFilters: '.filtro'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos( ElementIDs.TodoList, todos );
  }

  //Cuando la funcion App() se llama
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html
    document.querySelector(elementId).append( app );
    displayTodos();
  })();

  //Referencias HTML
  const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
  const todoListUL = document.querySelector( ElementIDs.TodoList );
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

  //Listeners
  newDescriptionInput.addEventListener('keyup', (e) => {
    if( e.keyCode !== 13) return;
    if( e.target.value.trim().length === 0) return;

    todoStore.addTodo( e.target.value );
    displayTodos();
    e.target.value = '';
  })

  todoListUL.addEventListener('click', (e) => {
    const element = e.target.closest('[data-id]');
    const dataId = element.getAttribute('data-id')
    if(e.target.getAttribute('class') === 'destroy'){
      todoStore.deleteTodo( dataId )
    }
    todoStore.toggleTodo( dataId );
    displayTodos();
  })

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  })

  filtersLIs.forEach( li => {
    li.addEventListener('click', (event) => {
      filtersLIs.forEach(el => el.classList.remove('selected'))
      event.target.classList.add('selected')
    })
  })


}