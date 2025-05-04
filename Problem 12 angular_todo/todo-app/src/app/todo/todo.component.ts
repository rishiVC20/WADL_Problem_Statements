import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  tasks: string[] = [];
  taskText: string = '';
  isEditing = false;
  editingIndex: number = -1;

  addOrUpdateTask() {
    if (!this.taskText.trim()) return;

    if (this.isEditing) {
      this.tasks[this.editingIndex] = this.taskText;
      this.isEditing = false;
      this.editingIndex = -1;
    } else {
      this.tasks.push(this.taskText);
    }
    this.taskText = '';
  }

  editTask(index: number) {
    this.taskText = this.tasks[index];
    this.isEditing = true;
    this.editingIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editingIndex === index) {
      this.isEditing = false;
      this.taskText = '';
    }
  }
}
