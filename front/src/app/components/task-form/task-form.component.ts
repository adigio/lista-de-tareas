import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  task = {
    title: '',
    description: '',
    completed: false,
  };

  constructor(private taskService: TaskService, private router: Router) {}

  addTask(): void {
    if (this.task.title.trim() && this.task.description.trim()) {
      // Envía la tarea al servicio
      this.taskService.addTask(this.task).subscribe(() => {
        // Limpia el formulario después de agregar
        this.task = {
          title: '',
          description: '',
          completed: false,
        };

        // Redirige a la lista de tareas
        this.router.navigate(['/']);
      });
    } else {
      alert('Por favor, completa todos los campos antes de guardar.');
    }
  }
}
