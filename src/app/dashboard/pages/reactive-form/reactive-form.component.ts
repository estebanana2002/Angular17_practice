import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TooltipDirective } from '../../../core/Directives/Tooltip.directive';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../interfaces/Food';


@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipDirective
  ],
  templateUrl: './reactive-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveFormComponent {
  /**
   * * FormGroup -> es la estructura
   * * FormBuilder -> es el que contruye la estructura del formGroup
   * * Validator -> validaciones
   */

  public FoodForm!: FormGroup;

  public showImage: boolean = false;
  public showAnimation: boolean = false;

  private fb = inject(FormBuilder);
  private FoodS = inject(FoodService);
  constructor(
    /**
     * ? Se puede importar asi o no xd
     */
    // private fb: FormBuilder
    ) {
      this.FoodForm = this.fb.group({
        name: ['Pescado al ojo de majo', [Validators.required]],
        price: [145, [Validators.required]],
        description: ['Es un pescado al mojo de ajo, pero lo escribi mal poke suena gracioso al ojo de majo jaja', [Validators.required, Validators.maxLength(1000)]],
        image: ['https://th.bing.com/th/id/OIP.Wfsk8GNbCBAwFqxaFLrMxAHaE7?rs=1&pid=ImgDetMain', [Validators.required]],
        category: ['Pescado mexa', [Validators.required]],
        isActive: [true, [Validators.required]],
      });
    }


    public addProd() {
      console.log(this.FoodForm.value);
      if (this.FoodForm.valid) {

        const isActiveValue = this.FoodForm.value.isActive === 'true';

        const newFood: Food = {
          name: this.FoodForm.value.name!,
          price: parseFloat(this.FoodForm.value.price!),
          description: this.FoodForm.value.description!,
          image: this.FoodForm.value.image!,
          category: this.FoodForm.value.category!,
          isActive: isActiveValue,
        };
        // this.myFoods.push(newFood);
        this.FoodS.addFood(newFood);
      } else {
        console.log("El formulario no es válido");
      }
      this.FoodForm.reset({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        isActive: 'true',
      });
    }

    public toggleImage() {
      if ( !this.showImage ) {
        this.showImage = true;
        this.showAnimation = false;
      } else {
        this.showAnimation = true;
        setTimeout(() => {
          this.showImage = false;
        }, 300);
      }
    }
}
