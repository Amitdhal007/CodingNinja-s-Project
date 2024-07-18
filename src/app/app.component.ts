import { Component, Inject, PLATFORM_ID } from '@angular/core';
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

  deleteTode(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    }
    console.log(todo);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  exportToCSV() {
    const csvData = this.convertToCSV(this.todos);
    this.downloadCSV(csvData);
  }

  private convertToCSV(todos: Todo[]): string {
    const header = ['Title', 'Description', 'Due Date', 'Priority', 'Status'];
    const rows = todos.map(todo => [todo.title, todo.desc, todo.dueDate, todo.priority, todo.status]);

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
}


