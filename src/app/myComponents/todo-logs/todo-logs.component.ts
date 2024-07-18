import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-logs',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './todo-logs.component.html',
  styleUrls: ['./todo-logs.component.css'] 
})
export class TodoLogsComponent {
  @Input() todo!: Todo;
  currentDate = new Date()

  constructor() {}
}

