import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskToDelete: number | null = null;

  constructor(private taskService: TaskService, private modalService: NgbModal) {}

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

  confirmDelete(modal: any): void {
    if (this.taskToDelete !== null) {
      this.taskService.deleteTask(this.taskToDelete).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task.id !== this.taskToDelete); // Elimina la tarea de la lista
        this.taskToDelete = null; // Resetea la ID seleccionada
        modal.close('delete confirmed'); // Cierra el modal
      });
    }
  }

  toggleCompletion(task: Task): void {
    this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe(() => {
      task.completed = !task.completed;
    });
  }
}