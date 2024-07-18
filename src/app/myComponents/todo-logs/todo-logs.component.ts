import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-logs',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './todo-logs.component.html',
  styleUrls: ['./todo-logs.component.css'] // Corrected to styleUrls
})
export class TodoLogsComponent {
  @Input() todo!: Todo;
  currentDate = new Date()

  constructor() {}
}

