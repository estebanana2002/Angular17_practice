import { AbstractControl, ValidationErrors } from "@angular/forms";

export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
export const fullnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

export function noName(control: AbstractControl): ValidationErrors | null {
  const value = control.get('fullname')?.value;
  // console.log(value);
  if ( value === 'Estebanana' ) {
    // Ese we de los {} dice que es el nombre del validator personalizado
    control.get('fullname')?.setErrors({'noEstebanana': true});
  }
  return (null);
}

export function validatePassword(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const newPassword = control.get('confirmPass')?.value;

  if ( password !== newPassword ) {
    console.log(password, '!==', newPassword);
    // Ese we de los {} dice que es el nombre del validator personalizado
    control.get('confirmPass')?.setErrors({'different': true});
  }
  return (null);
}

export function validateMatricula(control: AbstractControl): ValidationErrors | null {
  const matriculas_prohibidas = [
    'UTTI212031',
    'UTTI149001',
    'UTDN09848',
    'UTG212031',
  ];
  const matricula = control.get('matricula')?.value;

  console.log(matricula.toUpperCase());
  if ( matriculas_prohibidas.includes(matricula.toUpperCase()) ) {
    // Ese we de los {} dice que es el nombre del validator personalizado
    control.get('matricula')?.setErrors({'repeated': true});
  }
  return (null);
}
