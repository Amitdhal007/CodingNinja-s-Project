

import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './myComponents/add-todo/add-todo.component';
import { TodoLogsComponent } from './myComponents/todo-logs/todo-logs.component';
import { TodoItemComponent } from './myComponents/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AddTodoComponent,
    TodoLogsComponent,
    FormsModule,
    TodoItemComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'task-manager';
  todos: Todo[] = [];
  localItem: string | null = null;
  @ViewChild(AddTodoComponent) addTodoComponent!: AddTodoComponent;
  editingTodo: Todo | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.localItem = localStorage.getItem('todos');
      if (this.localItem === null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(this.localItem);
      }
    }
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    }
    console.log(todo);
  }

  editTodo(todo: Todo) {
    this.editingTodo = todo; 
    this.addTodoComponent.fillForm(todo);
    this.scrollToAddTodoForm();
  }

  addTodo(todo: Todo) {
    if (this.editingTodo) { 
      const index = this.todos.findIndex(t => t.currTime === this.editingTodo!.currTime);
      if (index !== -1) {
        this.todos[index] = todo;
      }
      this.editingTodo = null;
    } else {
      this.todos.push(todo); 
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
  

  exportToCSV() {
    const csvData = this.convertToCSV(this.todos);
    this.downloadCSV(csvData);
  }

  private convertToCSV(todos: Todo[]): string {
    const header = ['currTime', 'Title', 'Description', 'Due Date', 'Priority', 'Status'];
    const rows = todos.map(todo => [todo.currTime, todo.title, todo.desc, todo.dueDate, todo.priority, todo.status]);

    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  }

  private downloadCSV(csvData: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'todos.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  sortTodosBy(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const criteria = selectElement.value;

    switch (criteria) {
      case 'priority':
        this.todos.sort((a, b) => this.comparePriority(a.priority, b.priority));
        break;
      case 'date':
        this.todos.sort((a, b) => new Date(b.currTime).getTime() - new Date(a.currTime).getTime());
        break;
      case 'status':
        this.todos.sort((a, b) => this.compareStatus(a.status, b.status));
        break;
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  private comparePriority(a: string, b: string): number {
    const priorities = ['High', 'Medium', 'Low'];
    return priorities.indexOf(a) - priorities.indexOf(b);
  }

  private compareStatus(a: string, b: string): number {
    const statuses = ['Pending', 'In-Progress', 'Completed'];
    return statuses.indexOf(a) - statuses.indexOf(b);
  }

  private scrollToAddTodoForm() {
    const element = document.querySelector('.create-todo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
