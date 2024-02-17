import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../../interfaces/employee';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';


@Component({
  selector: 'app-exam-partial-one',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './exam_partialOne.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExamPartialOneComponent {
  public positions: string[] = [
    'Ingeniero en Informatica',
    'Tecnico en ChatGpt',
    'Diseñador grafico',
    'Ingeniero en Sistemas',
    'Ingeniero en prompts',
    'Desarrollador fullstack',
  ];
  public employees: Employee[] = [
    {
      name: 'Luis esteban',
      lastname: 'Lopez Rios',
      salary: 10000,
      email: 'esteban@gmail.com',
      position: 'Project Manager',
      photo: 'https://th.bing.com/th/id/R.2cb573cbc672711e96d11ff04c4fc79e?rik=aq%2brvSjcV9FBig&pid=ImgRaw&r=0'
    },
    {
      name: 'Thomas',
      lastname: 'Gonzalez Revilla',
      salary: 5700,
      email: 'thomas@gmail.com',
      position: 'Director de TI',
      photo: 'https://th.bing.com/th/id/R.2cb573cbc672711e96d11ff04c4fc79e?rik=aq%2brvSjcV9FBig&pid=ImgRaw&r=0'
    },
    {
      name: 'Iver Ivan',
      lastname: 'Cruz Perez',
      salary: 5500,
      email: 'iver@gmail.com',
      position: 'Leader Frontend',
      photo: 'https://th.bing.com/th/id/R.2cb573cbc672711e96d11ff04c4fc79e?rik=aq%2brvSjcV9FBig&pid=ImgRaw&r=0'
    },
    {
      name: 'Victor Gabriel',
      lastname: 'Garcia Valencia',
      salary: 5500,
      email: '',
      position: 'Leader Backend',
      photo: 'https://th.bing.com/th/id/R.2cb573cbc672711e96d11ff04c4fc79e?rik=aq%2brvSjcV9FBig&pid=ImgRaw&r=0'
    },
  ];
  public employeeForm!: FormGroup;
  private fb = inject(FormBuilder);

  public validators: any = {
    required: (input: string) => `El campo ${input} es requerido!`,
    min: (minValue: number) => `El valor no debe ser menor que ${minValue}!`,
    minLength: (minLength: number) => `La descripcion debe ser mayor que ${minLength} caracteres!`,
    email: `Este campo debe ser de tipo email!`,
  }
  constructor(
    private toastr: ToastrService,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastname: [''],
      photo: [''],
      salary: [0, [Validators.required, Validators.min(3000)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', [Validators.required]],
    });
  }

  public addEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
    } else {
      const employee = this.employeeForm.value;
      this.employees.push(employee);
      this.employeeForm.reset();
      this.showToaster();
    }
  }

  public validateController(inputField: string) {
    const input = this.employeeForm.get(inputField);

    if (input?.touched) {
      if (input?.hasError('required')) {
        return this.validators.required(inputField);
      } else if (input?.hasError('min')) {
        return this.validators.min(3000);
      } else if (input?.hasError('minlength')) {
        return this.validators.minLength(4);
      } else if (input?.hasError('email')) {
        return this.validators.email;
      }
    }
    return null;
  }

  public showToaster() {
    this.toastr.success('Se agregó el empleado correctamente!', 'Empleado agregado!')
      .onTap
      .pipe(take(1));
  }
}
