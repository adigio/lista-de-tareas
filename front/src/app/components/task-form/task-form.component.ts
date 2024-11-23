import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  task: {
    id?: number;
    title: string;
    description: string;
    completed: boolean;
  } = {
    title: '',
    description: '',
    completed: false,
  };

  isEditMode: boolean = false;

  constructor(
    private taskService: TaskService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      this.taskService.getTaskById(taskId).subscribe((data) => {
        this.task = { ...data };
      });
    }
  }

  saveTask(): void {
    if (this.task.title.trim() && this.task.description.trim()) {
      if (this.isEditMode) {
        this.taskService.updateTask(this.task).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.taskService.addTask(this.task).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
