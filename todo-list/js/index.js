//Selectors
const todoInput = document.querySelector('.todo-input');
const entrySection = document.getElementById('entrySection');
const todoButton = document.querySelector('.todo-button');
const checkBtn = document.querySelector('.todo-check');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodoHandler);
filterOption.addEventListener('click', filterTodo);
//Functions

function updateUI() {
  if (todoElements.length === 0) {
    entrySection.style.display = 'flex';
  } else {
    entrySection.style.display = 'none';
  }
}


let todoElements = [
  {
    title: 'Научиться нормально думать0',
    id: 14,
    isDone: false,
  },
  {
    title: 'Научиться нормально думать1',
    id: 15,
    isDone: false,
  },
  {
    title: 'Научиться нормально думать2',
    id: 16,
    isDone: true,
  },
];


function createDom() {
  //  clear list
  todoList.innerHTML = '';
  //
  todoElements.map(
      item => {
        const todoContainer = document.createElement('li');
        todoContainer.classList.add('todo-item');
        todoContainer.setAttribute('id', item.id);
        todoContainer.innerHTML = `
          <span class="todo-info">${item.title}</span>
          <div class="todo-nav">
            <button class="todo-check" id="${'checkId' + item.id}">
              <i class="fas fa-check"></i>
            </button>
            <button  class="todo-trash" id="${'removeId' + item.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>`;

        if (item.isDone) {
          todoContainer.classList.add('done');
        }
        todoElements.sort((a,b) => a.isDone - b.isDone ? 1 : -1);
        todoList.appendChild(todoContainer);
        const todoTrash = document.getElementById(`${'removeId' + item.id}`);
        todoTrash.addEventListener('click', deleteToDo.bind(null, item.id));

        const todoCheck = document.getElementById(`${'checkId' + item.id}`)
        todoCheck.addEventListener('click', checkMark.bind(null, item.id));
      });
  updateUI();
}

function renderDom() {
  createDom();
}

renderDom();

function addTodoHandler() {
  const titleValue = todoInput.value;
  // add object with key and value
  const newTodo = {
    title: titleValue,
    id: Math.floor(Math.random() * 10),
    isDone: false
  };
  //pushing elements
  saveLocalTodos(newTodo);
  todoElements.push(newTodo);
  //Clear Input Value
  todoInput.value = '';
  renderDom();
}

function deleteToDo(elemId) {
  let elemIndex = 0;
  for (const todoElem of todoElements) {
    if (todoElem.id === elemId) {
      break;
    }
    elemIndex++;
  }
  todoElements.splice(elemIndex, 1);
  renderDom();
}

function checkMark(checkId, isDone) {
  for (const li of todoElements) {
    if (li.id === checkId) {
      li.isDone = true
    }
  }
  renderDom();
}

function filterTodo(e) {
  console.log(e.target.value);
  const todoElements = todoList.childNodes;
  todoElements.forEach((todo) => {
    switch (e.target.value) {
      default:
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains('done')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('done')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todoElements;
  if (localStorage.getItem('todos')) {
    todoElements = [];
  } else {
    todoElements = JSON.parse(localStorage.getItem('todos'));
  }
  todoElements.push(todo);
  localStorage.setItem('todos', JSON.stringify(todoElements));
}

function getTodos() {
  if (localStorage.getItem('todos') === null) {
  } else {
    todoElements = JSON.parse(localStorage.getItem('todos'));
  }
}
