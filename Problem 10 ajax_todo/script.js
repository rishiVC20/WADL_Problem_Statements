// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// function saveTasks() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks() {
//   const list = document.getElementById('taskList');
//   list.innerHTML = '';

//   tasks.forEach((task, index) => {
//     const li = document.createElement('li');

//     const span = document.createElement('span');
//     span.textContent = task;
//     span.contentEditable = false;
//     span.id = `task-${index}`;

//     const editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     editBtn.onclick = () => toggleEdit(index);

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.onclick = () => deleteTask(index);

//     li.appendChild(span);
//     li.appendChild(editBtn);
//     li.appendChild(deleteBtn);

//     list.appendChild(li);
//   });
// }

// function addTask() {
//   const input = document.getElementById('taskInput');
//   const taskText = input.value.trim();
//   if (!taskText) return;

//   tasks.push(taskText);
//   saveTasks();
//   loadTasks();
//   input.value = '';
// }

// function deleteTask(index) {
//   tasks.splice(index, 1);
//   saveTasks();
//   loadTasks();
// }

// function toggleEdit(index) {
//   const span = document.getElementById(`task-${index}`);
//   const editBtn = span.nextSibling;

//   if (span.contentEditable === 'false') {
//     span.contentEditable = true;
//     span.focus();
//     editBtn.textContent = 'Save';
//   } else {
//     tasks[index] = span.textContent.trim();
//     span.contentEditable = false;
//     editBtn.textContent = 'Edit';
//     saveTasks();
//     loadTasks();
//   }
// }

// window.onload = loadTasks;


let fakeServerDB = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(fakeServerDB));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  fakeServerDB.forEach((task, index) => {
    list.innerHTML += `
      <li>
        <span class="task-text">${task.text}</span>
        <div class="actions">
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return alert("Task cannot be empty.");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/add-task", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const task = { text: taskText };
      fakeServerDB.push(task);
      saveToLocalStorage();
      renderTasks();
      input.value = "";
    }
  };

  xhr.send(JSON.stringify({ text: taskText }));
}

function editTask(index) {
  const updatedText = prompt("Edit your task:", fakeServerDB[index].text);
  if (updatedText === null || updatedText.trim() === "") return;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/update-task", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      fakeServerDB[index].text = updatedText.trim();
      saveToLocalStorage();
      renderTasks();
    }
  };

  xhr.send(JSON.stringify({ index, newText: updatedText.trim() }));
}

function deleteTask(index) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/delete-task", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      fakeServerDB.splice(index, 1);
      saveToLocalStorage();
      renderTasks();
    }
  };

  xhr.send(JSON.stringify({ index }));
}

// Initial render
renderTasks();