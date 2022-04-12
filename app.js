//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();

  //Create todoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create list, append to todoDiv
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value; // Adds entered text
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Add todo to local storage
  saveLocalTodos(todoInput.value);

  //Create check mark button, append to todoDiv
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Create Trash button, append to todo div
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append newly created todoDiv(1 list, 2 buttons)to todoList
  todoList.appendChild(todoDiv);

  //Clear todoInput value after each entry
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  
  //Delete Todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    //Removes item after transition finishes
    todo.addEventListener('transitionend', function(){
      todo.remove();
    });
  }

  //Check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value){
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else{
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else{
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check if something is already in local storage
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []; //Create empty array if nothing exists
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []; //Create empty array if nothing exists
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    //Create todoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create list, append to todoDiv
  const newTodo = document.createElement('li');
  newTodo.innerText = todo; 
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Create check mark button, append to todoDiv
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Create Trash button, append to todo div
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append newly created todoDiv(1 list, 2 buttons)to todoList
  todoList.appendChild(todoDiv);

  })
}

function removeLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []; //Create empty array if nothing exists
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos))

  
  //console.log(todo.children[0].innerText);
  //console.log(todos.indexOf("banana"));
}