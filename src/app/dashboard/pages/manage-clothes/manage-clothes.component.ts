import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * formulario de ropa
 * nombre - required
 * descripcion - required, minlength(20)
 * precio - required, precio maximo de $5k
 * stock - required, solo numeros positivos, no mas de 500pz en stock
 * marca - required
 * clasificacion > adulto, niña. niño, aliade - required
 */

@Component({
  selector: 'app-manage-clothes',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './manage-clothes.component.html',
})
export default class ManageClothesComponent {
  public clasificaciones: string[] = [
    'adulto',
    'niña',
    'niño',
    'aliade',
  ];
  public marcas: string[] = [
    'Nike',
    'Adidas',
    'Gucci',
    'Polo',
    'Cuidado con el perro',
    'Hugo Boss',
    'Hugo',
    'Boss',
    'Iqnotik',
  ];

  private fb = inject(FormBuilder);
  public clotheForm!: FormGroup;
  public validators: any = {
    required: (input: string) => `El campo ${input} es requerido!`,
    max: (maxValue: number) => `El valor no debe ser mayor que ${maxValue}!`,
    min: (minValue: number) => `El valor no debe ser menor que ${minValue}!`,
    minLength: (minLength: number) => `La descripcion debe ser mayor que ${minLength} caracteres!`,
  }
  constructor() {
    this.clotheForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      precio: [null, [Validators.required, Validators.min(0), Validators.max(5000)]],
      stock: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      marca: [null, [Validators.required]],
      clasificacion: [null, [Validators.required]],
    });
  }

  public validateController(inputField: string) {
    const input = this.clotheForm.get(inputField);

    if (input?.touched) {
      if (input?.hasError('required')) {
        return this.validators.required(inputField);
      } else if (input?.hasError('max')) {
          if (inputField === 'precio') {
            return this.validators.max(5000);
          } else if (inputField === 'stock') {
            return this.validators.max(500);
          }
      } else if (input?.hasError('min')) {
        return this.validators.min(0);
      } else if (input?.hasError('minlength')) {
        return this.validators.minLength(20);
      }
    }
    return null;
  }

}
