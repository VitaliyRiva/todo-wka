//Selectors
const todoInput = document.querySelector('.todo-input');
const entrySection = document.getElementById('entrySection');
const todoButton = document.querySelector('.todo-button');
const todoListItem = document.querySelectorAll('.todo-item');
const todoList = document.querySelector('.todo-list');


//Event listeners
todoButton.addEventListener('click', addTodoHandler);
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
    isDone: false,
  },
];


function renderDom(title, id, isDone) {
  //  clear list
  todoList.innerHTML = '';
  //
  todoElements.map(
    item => {
      const todoContainer = document.createElement('li');
      todoContainer.classList.add('todo-item');
      todoContainer.setAttribute('id', item.id);
      todoContainer.innerHTML = `
        <span class="todo-info">${ item.title}</span>
        <div class="todo-nav">
          <button class="todo-check" id="${'checkId' + item.id}">
            <i class="fas fa-check"></i>
          </button>
          <button  class="todo-trash" id="${'removeId' + item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
      todoList.appendChild(todoContainer);
      const todoTrash = document.getElementById(`${'removeId' + item.id}`);
      todoTrash.addEventListener('click', deleteToDo.bind(null, item.id));

      const todoCheck = document.getElementById(`${'checkId' + item.id}`)
      todoCheck.addEventListener('click', checkMark.bind(null, item.id));
    });
  updateUI();
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
  todoElements.push(newTodo);
  //Clear Input Value
  todoInput.value = '';
  renderDom();
}

// todo: сделать удалениеобъекта
//  при удалении удалять из массива по айди

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



function checkMark(checkId) {
  let elemIndex = 0;
  const item = checkId;
  console.log(item);
  for (const todoElem of todoElements) {
    if (todoElem.id === checkId) {
      console.log(todoElements[elemIndex].isDone = true);
    }
    elemIndex++;
  }


  // console.log(todoMark);
  // if (item.classList[0] === 'todo-check') {
  //   todoMark.classList.toggle('done');
  // }
}