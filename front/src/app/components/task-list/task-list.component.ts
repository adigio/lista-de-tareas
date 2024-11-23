import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskToDelete: number | null = null;

  constructor(private taskService: TaskService, private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  openDeleteModal(taskId: number, content: any): void {
    this.taskToDelete = taskId;
    this.modalService.open(content, { ariaLabelledBy: 'deleteModalLabel' });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  editTask(id: number): void {
    this.router.navigate([`/editar/${id}`]);
  }

  confirmDelete(modal: any): void {
    if (this.taskToDelete !== null) {
      this.taskService.deleteTask(this.taskToDelete).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task.id !== this.taskToDelete);
        this.taskToDelete = null;
        modal.close('delete confirmed');
      });
    }
  }

  toggleCompletion(task: Task): void {
    this.taskService.updateTask({ id: task.id, completed: !task.completed }).subscribe(() => {
      task.completed = !task.completed;
    });
  }
}