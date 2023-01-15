// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// FUNCTIONS
// Fuction that adds a new todo
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  if (todoInput.value !== "") {
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    // Append the newTodo to the todoDiv(parent)
    todoDiv.appendChild(newTodo);
    // Add todo to Localstorage
    saveLocalTodos(todoInput.value);
    // Create a check mark button for completed todos
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Create a delete button to delete todos
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"><i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append todoDiv to todoList(parent)
    todoList.appendChild(todoDiv);
    // Clear todo input value
    todoInput.value = "";
  } else {
    alert("Abeg input wetin you one do today");
  }
}

// function that deletes a todo
function deleteCheck(event) {
  const item = event.target;
  // Delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Check todo as completed
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Function that filters todos
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Function that saves todo to localStorage
function saveLocalTodos(todo) {
  let todos;
  // Check if there's a todo in localstorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Functiion that gets todo in localStorage and displays it if page is refreshed
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    // Append the newTodo to the todoDiv(parent)
    todoDiv.appendChild(newTodo);
    // Create a check mark button for completed todos
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Create a delete button to delete todos
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"><i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append todoDiv to todoList(parent)
    todoList.appendChild(todoDiv);
  });
}

// Function that removes todo from localStorage when the trash button is clicked
function removeLocalTodos(todo) {
  let todos;
  // Check if there's a todo in localstorage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
