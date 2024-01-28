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
  constructor( ) {
    this.clotheForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      precio: [null, [Validators.required, Validators.min(0), Validators.max(5000)]],
      stock: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      marca: [null, [Validators.required]],
      clasificacion: [null, [Validators.required]],
    });
  }

  public validateControl(input: string) {
    return !!this.clotheForm.get(input)?.getError('required') && !!this.clotheForm.get(input)?.touched ? `El campo ${input} es requerido` : '';
  }
  public returnMesagge(input: string) {
    return `El campo ${input} es requerido!`;
  }
}
