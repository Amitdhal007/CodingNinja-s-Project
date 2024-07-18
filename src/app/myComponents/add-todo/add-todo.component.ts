import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  title!: string;
  desc!: string;
  dueDate!: Date;
  priority!: string;
  status!: string;

  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();

  onSubmit() {
    const currTime = new Date();

    const todo: Todo = {
      title: this.title,
      desc: this.desc,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status,
      currTime: currTime
    };

    this.addTodo.emit(todo);

    // Reset form values after submission
    this.title = '';
    this.desc = '';
    this.dueDate = new Date();
    this.priority = 'Low';
    this.status = 'Pending';
  }
}

