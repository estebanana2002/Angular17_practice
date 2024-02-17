import { Component, inject } from '@angular/core';
import { TooltipDirective } from '../../../../core/Directives/Tooltip.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailPattern, fullnamePattern, noName, validateMatricula, validatePassword } from '../../../../validators/common.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TooltipDirective,
    CommonModule
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {

  private fb = inject(FormBuilder);
  public registerForm!: FormGroup;
  public showPass: boolean = false;
  public validators = {
    minlength: (min: number) => `Los caracteres minimos son ${min}!`,
    pattern: () => `Rellene el campo correctamente!`,
    required: () => `Este campo es requerido!`,
    noEstebanana: () => `No ingrese Estebanana!`,
    different: () => `Las contraseñas no coinciden!`,
    repeated: () => `Esta matricula tiene reportes de robo!`,
  };
  constructor() {
    this.registerForm = this.fb.group({
      fullname: ['',
      [Validators.required, Validators.minLength(5), Validators.pattern(fullnamePattern)]
    ],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
    }, {validators: [noName, validatePassword, validateMatricula]});
  }


  public validateController(inputField: string) {
    const input = this.registerForm.get(inputField);

    if (input?.touched) {
      if (input?.hasError('required')) {
        return this.validators.required();
      } else if (input?.hasError('minlength')) {
        return this.validators.minlength(5);
      } else if (input?.hasError('pattern')) {
        return this.validators.pattern();
      } else if (input?.hasError('noEstebanana')) {
        return this.validators.noEstebanana();
      } else if (input?.hasError('different')) {
        return this.validators.different();
      } else if (input?.hasError('repeated')) {
        return this.validators.repeated();
      }
    }
    return null;
  }

}
