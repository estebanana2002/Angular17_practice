import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TaskListComponent } from '../../../components/task-list/task-list.component';
import Task from '../../../../interfaces/Task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [
    CommonModule,
    TaskListComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pendientes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PendientesComponent {
  public taskList: any = signal([]);

  public taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  public validators: any = {
    required: (input: string) => `El campo ${input} es requerido!`,
    minLength: (minLength: number) => `El campo debe ser mayor que ${minLength} caracteres!`,
  }

  public newTask() {
    if ( this.taskForm.valid ) {

      const tasks = this.taskList();
      console.log(this.taskList, 'asdasd');
      const newTasks = [... tasks, this.taskForm.value];
      console.log(newTasks);

      this.taskList.set(newTasks);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  public validateController(inputField: string) {
    const input = this.taskForm.get(inputField);

    if (input?.touched) {
      if (input?.hasError('required')) {
        return this.validators.required(inputField);
      } else if (input?.hasError('minlength')) {
        if ( inputField === 'title' ) {
          return this.validators.minLength(4);
        } else if ( inputField === 'description' ) {
          return this.validators.minLength(8);
        }
      }
    }
    return null;
  }
}
