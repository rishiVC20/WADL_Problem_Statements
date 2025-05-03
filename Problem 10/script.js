let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;
    span.contentEditable = false;
    span.id = `task-${index}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => toggleEdit(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (!taskText) return;

  tasks.push(taskText);
  saveTasks();
  loadTasks();
  input.value = '';
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  loadTasks();
}

function toggleEdit(index) {
  const span = document.getElementById(`task-${index}`);
  const editBtn = span.nextSibling;

  if (span.contentEditable === 'false') {
    span.contentEditable = true;
    span.focus();
    editBtn.textContent = 'Save';
  } else {
    tasks[index] = span.textContent.trim();
    span.contentEditable = false;
    editBtn.textContent = 'Edit';
    saveTasks();
    loadTasks();
  }
}

window.onload = loadTasks;
