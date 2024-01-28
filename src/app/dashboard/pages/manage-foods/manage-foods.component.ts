import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { TooltipDirective } from '../../../core/Directives/Tooltip.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Food } from '../../../interfaces/Food';
import { FoodService } from '../../../services/food.service';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-manage-foods',
  standalone: true,
  imports: [
    CommonModule,
    TooltipDirective,
    ReactiveFormsModule
  ],
  templateUrl: './manage-foods.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ManageFoodsComponent {
  public allFood: Food[] = [];
  public especificProd!: Food;
  public showProdModal: boolean = false;
  public showFormModal: boolean = false;
  public showError: boolean = false;

  public prodForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isActive: new FormControl('true', [Validators.required]),
  });

  public recognition =  new webkitSpeechRecognition();
  public isStoppedSpeechRecog: boolean = false;
  public isRecording: boolean = false;
  public text = '';
  public tempWords: any = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private FoodS: FoodService,
    ) {
      this.allFood = this.FoodS.getFoods();
      //!
      this.init();
    }

  private init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-MX';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript.replace(/\./g, '').trim();
      console.log(transcript);
    });
  }

  public start() {
    this.isStoppedSpeechRecog = false;
    this.isRecording = true;
    this.text = '';
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }
  public stop() {
    this.isStoppedSpeechRecog = true;
    this.isRecording = false;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  private wordConcat() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
    if ( this.text ) {

      this.debounceSearch(this.text);
    }
  }



  public addProd() {
    console.log(this.prodForm.value);
    if (this.prodForm.valid) {

      const isActiveValue = this.prodForm.value.isActive === 'true';

      const newFood: Food = {
        name: this.prodForm.value.name!,
        price: parseFloat(this.prodForm.value.price!),
        description: this.prodForm.value.description!,
        image: this.prodForm.value.image!,
        category: this.prodForm.value.category!,
        isActive: isActiveValue,
      };
      // this.myFoods.push(newFood);
      this.FoodS.addFood(newFood);
      this.showFormModal = !this.showFormModal;
    } else {
      console.log("El formulario no es válido");
      this.toggleAlert();
    }
    this.prodForm.reset({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      isActive: 'true',
    });
  }

  public toggleAlert() {
    this.showError = true;
    this.cdr.detectChanges();
    setTimeout(() => {
        this.showError = false;
        this.cdr.detectChanges();
    }, 2000);
  }

  public changeState(position: number) {
    this.FoodS.changeStatus(position);
    // this.myFoods[position].isActive =!this.myFoods[position].isActive;
  }
  public deleteProd(position: number) {
    this.FoodS.deleteFood(position);
    // this.myFoods.splice(position, 1);
  }

  public addToCart(food: any) {
    // this.FoodS.addToCart({
    //   name: 'Chilaquiles',
    //   price: 79.99,
    //   description: 'Los chilaquiles, tesoro culinario de la gastronomía mexicana, son una deliciosa y reconfortante explosión de sabores y texturas. Este platillo tan versátil combina tortillas de maíz crujientes, bañadas en salsa roja o verde, con la suavidad de crema, el toque salado del queso fresco y la frescura de cebolla y cilantro. La magia de los chilaquiles radica en su capacidad de adaptarse a todos los gustos: desde los que prefieren el picante hasta aquellos que buscan un sabor más suave. Pueden acompañarse de jugosos trozos de pollo, tiernos huevos pochados o aguacate cremoso. Este manjar es un desayuno reconfortante, un almuerzo satisfactorio o una cena reconociendo su versatilidad a lo largo del día. Los chilaquiles no solo alimentan el cuerpo, sino que también alimentan el alma, transportando a quien los prueba a las calles de México, donde la tradición y la autenticidad se fusionan en cada bocado. Un plato que va más allá de ser una simple comida, los chilaquiles son una experiencia gastronómica que celebra la riqueza de la cultura mexicana en cada porción.',
    //   image: 'https://bing.com/th?id=OSK.77ded07c75d2037cd7f5df26b99926b1',
    //   category: 'Mexicana',
    //   isActive: true,
    // });
    this.FoodS.addToCart(food);
  }

  public toggleProdModal(product?: Food) {
    this.showProdModal = !this.showProdModal;
    if ( this.showProdModal ) {
      this.especificProd = product || {
        name: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        isActive: false,
      }
    }
  }

  public showForm() {
    this.showFormModal = !this.showFormModal;
  }

  public search(event: any) {
    const inputValue = event.target.value.toLowerCase().trim().replace(/\./g, '');

    this.debounceSearch(inputValue);
  }

  private debounceSearch(inputValue: string): void {
    if (inputValue) {
      setTimeout(() => {
          console.log(inputValue);
          this.allFood = this.FoodS.handleInput(inputValue.replace(/\./g, '').trim());
          console.log(this.allFood, 'Busqueda');
      }, 100);
    } else {
      this.allFood = this.FoodS.getFoods();
      console.log(this.allFood, 'TODO');
    }
  }
}
