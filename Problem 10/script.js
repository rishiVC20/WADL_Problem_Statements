class TodoList {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTask');
        this.todoList = document.getElementById('todoList');
        
        this.init();
    }

    init() {
        // Load tasks from localStorage
        this.loadTasks();
        
        // Add event listeners
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = '';
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        this.saveTasks();
        this.renderTasks();
    }

    editTask(id, newText) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText };
            }
            return task;
        });
        this.saveTasks();
        this.renderTasks();
    }

    renderTasks() {
        this.todoList.innerHTML = '';
        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `todo-item ${task.completed ? 'completed' : ''}`;
            
            taskElement.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <input type="text" value="${task.text}" readonly>
                <div class="actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="save-btn"><i class="fas fa-save"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;

            // Add event listeners
            const checkbox = taskElement.querySelector('input[type="checkbox"]');
            const textInput = taskElement.querySelector('input[type="text"]');
            const editBtn = taskElement.querySelector('.edit-btn');
            const saveBtn = taskElement.querySelector('.save-btn');
            const deleteBtn = taskElement.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTask(task.id));
            
            editBtn.addEventListener('click', () => {
                taskElement.classList.add('editing');
                textInput.readOnly = false;
                textInput.focus();
            });

            saveBtn.addEventListener('click', () => {
                taskElement.classList.remove('editing');
                textInput.readOnly = true;
                this.editTask(task.id, textInput.value);
            });

            textInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    taskElement.classList.remove('editing');
                    textInput.readOnly = true;
                    this.editTask(task.id, textInput.value);
                }
            });

            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            this.todoList.appendChild(taskElement);
        });
    }
}

// Initialize the todo list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
}); 