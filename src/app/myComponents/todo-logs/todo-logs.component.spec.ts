import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLogsComponent } from './todo-logs.component';

describe('TodoLogsComponent', () => {
  let component: TodoLogsComponent;
  let fixture: ComponentFixture<TodoLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
