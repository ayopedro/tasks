//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all Event Listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load events
  document.addEventListener('DOMContentLoaded', getTasks);

  //Add task Event
  form.addEventListener('submit', addTask);

  //remove task Event
  taskList.addEventListener('click', removeTask);

  //clear tasks
  clearBtn.addEventListener('click', clearTasks)

  //filter Task events
  filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';

    //create text node and append to the li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);

    //Append Child to the ul
    taskList.appendChild(li);
  })
}

//Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  //Create li element
  const li = document.createElement('li');

  //Add class
  li.className = 'collection-item';

  //create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to the li
  li.appendChild(link);

  //Append Child to the ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear the Input
  taskInput.value = '';

  e.preventDefault();
}

//store tasks
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

  }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear task
function clearTasks(e){
  if(confirm('Clear all tasks?')){
    taskList.innerHTML = '';
  }
  clearTaskFromLocalStorage();
}

//Clear all from local Storage
function clearTaskFromLocalStorage(){
  localStorage.clear();
}


//Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text)!== -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}
