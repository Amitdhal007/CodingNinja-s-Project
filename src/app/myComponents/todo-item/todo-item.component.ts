import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoEdit: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onDelete(todo: Todo) {
    this.todoDelete.emit(todo);
  }

  onEdit(todo: Todo) {
    this.todoEdit.emit(todo);
  }

  isOverdue(todo: Todo): boolean {
    const dueDate = new Date(todo.dueDate);
    const currentDate = new Date(todo.currTime);
    return todo.status === 'Pending' && currentDate > dueDate;
  }

  isDone(todo: Todo): boolean {
    const dueDate = new Date(todo.dueDate);
    const currentDate = new Date(todo.currTime);
    return todo.status === 'Completed' && currentDate <= dueDate;
  }
  
}



