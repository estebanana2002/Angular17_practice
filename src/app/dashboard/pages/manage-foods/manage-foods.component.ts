import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TooltipDirective } from '../../../core/Directives/Tooltip.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Food {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isActive: boolean;
}

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
  public myFoods: Food[] = [
    // {
    //   name: '',
    //   price: 0,
    //   description: '.',
    //   image: '',
    //   category: '',
    //   isActive: true
    // },
    {
      name: 'Sushi',
      price: 70.98,
      description: 'Delicioso sushi japonés con variedad de pescados y arroz.',
      image: 'https://th.bing.com/th/id/R.5734cc4e8318cc573cbfef4209fa8943?rik=yq4HGT3mRsxKkg&pid=ImgRaw&r=0',
      category: 'Japonés',
      isActive: false,
    },
    {
      name: 'Pizza Margarita',
      price: 270,
      description: 'Clásica pizza italiana con salsa de tomate, mozzarella y albahaca.',
      image: 'https://th.bing.com/th/id/OIP.oIUh8KsYt9woVHbnpJmQDwHaFj?rs=1&pid=ImgDetMain',
      category: 'Italiano',
      isActive: true,
    },
    {
      name: 'Tacos al Pastor',
      price: 65,
      description: 'Tacos mexicanos con carne de cerdo marinada y piña.',
      image: 'https://milrecetas.net/wp-content/uploads/2016/09/Tacos-al-pastor-5.jpg',
      category: 'Mexicano',
      isActive: true,
    },
    {
      name: 'Pasta Carbonara',
      price: 145.50,
      description: 'Pasta italiana con salsa de huevo, queso, panceta y pimienta negra.',
      image: 'https://th.bing.com/th/id/R.415f6084504f1642b7f92b98ce13430f?rik=CgPH9IoM17NyIg&riu=http%3a%2f%2ffoodwhirl.com%2fwp-content%2fuploads%2f2017%2f02%2fspaghetti-carbonara-insta.jpg&ehk=k6BrmXRCK%2bjCz6K8qHVVhXFVe%2fO7GbyUM0uaGzNJq20%3d&risl=&pid=ImgRaw&r=0',
      category: 'Italiano',
      isActive: false,
    },
    {
      name: 'Paella',
      price: 180,
      description: 'Plato español con arroz, mariscos, pollo y azafrán.',
      image: 'https://th.bing.com/th/id/OIP.phTmUAnPzJLEWZeikp0WJQHaE6?rs=1&pid=ImgDetMain',
      category: 'Español',
      isActive: true,
    },
    {
      name: 'Curry de Pollo',
      price: 90,
      description: 'Plato hindú con pollo, verduras y salsa de curry.',
      image: 'https://assets.afcdn.com/story/20190424/2002372_w2832h1590c1.jpg',
      category: 'Hindú',
      isActive: true,
    },
    {
      name: 'Hamburguesa BBQ',
      price: 135.50,
      description: 'Hamburguesa con carne a la parrilla, queso cheddar, bacon y salsa BBQ.',
      image: 'https://th.bing.com/th/id/R.79f6d5f7888b47753e345955ddd47feb?rik=r4DCYIk1U6RTQg&pid=ImgRaw&r=0',
      category: 'Americano',
      isActive: false,
    },
    {
      name: 'Dim Sum',
      price: 70,
      description: 'Variedad de bocadillos chinos al vapor o fritos.',
      image: 'https://th.bing.com/th/id/OIP.eYAF77sj62wZeMuCfbdAzwHaER?rs=1&pid=ImgDetMain',
      category: 'Chino',
      isActive: false,
    },
    {
      name: 'Ceviche',
      price: 65,
      description: 'Plato peruano con pescado marinado en limón, cilantro y ají.',
      image: 'https://th.bing.com/th/id/OIP.rkdSasB85_Baq3NwDSd6WgHaHa?rs=1&pid=ImgDetMain',
      category: 'Peruano',
      isActive: true,
    },
    {
      name: 'Ramen',
      price: 70,
      description: 'Sopa japonesa con fideos, caldo, cerdo, huevo y verduras.',
      image: 'https://th.bing.com/th/id/R.2a8c4382ecda1e528259c56fce96527d?rik=7sTvnk2I2K%2bupA&pid=ImgRaw&r=0',
      category: 'Japonés',
      isActive: true,
    },
    {
      name: 'Espinacas a la Florentina',
      price: 40,
      description: 'Plato italiano con espinacas, bechamel y queso gratinado.',
      image: 'https://cdn1.cocina-familiar.com/pasos/thumb/12134.JPG',
      category: 'Italiano',
      isActive: true,
    },
    {
      name: 'Gyozas',
      price: 120,
      description: 'Empanadillas japonesas rellenas de carne y verduras.',
      image: 'https://th.bing.com/th/id/OIP.h1Qe5Kv8ofu3Q5wJJ2dWdQHaGo?rs=1&pid=ImgDetMain',
      category: 'Japonés',
      isActive: false,
    },
    {
      name: 'Mole Poblano',
      price: 60,
      description: 'Plato mexicano con salsa de chiles, chocolate y pollo.',
      image: 'https://th.bing.com/th/id/OIP.Md57cwqUxr6xV-QuI2aitQHaFA?rs=1&pid=ImgDetMain',
      category: 'Mexicano',
      isActive: true,
    },
    {
      name: 'Fish and Chips',
      price: 95,
      description: 'Plato británico con pescado rebozado y papas fritas.',
      image: 'https://th.bing.com/th/id/R.b2e51f13918363ca140f45ff0a2e4008?rik=pmFfrx2WtQIsBg&riu=http%3a%2f%2fstatic.guim.co.uk%2fsys-images%2fGuardian%2fAbout%2fGeneral%2f2014%2f9%2f12%2f1410531530344%2fFish-and-chips-014.jpg&ehk=jEEmrfAoThNWHDoK6VwrgsfS2d6u3YgQgeSUDQ%2fuZbg%3d&risl=&pid=ImgRaw&r=0',
      category: 'Británico',
      isActive: true,
    },
    {
      name: 'Tiramisú',
      price: 360,
      description: 'Postre italiano con capas de bizcocho, café y mascarpone.',
      image: 'https://cdn7.kiwilimon.com/recetaimagen/35448/42520.jpg',
      category: 'Italiano',
      isActive: true,
    },
    {
      name: 'Sashimi de Salmón',
      price: 210,
      description: 'Finas láminas de salmón fresco servidas con wasabi y salsa de soja.',
      image: 'https://th.bing.com/th/id/OIP.v-5qyjrDZZhdxx9c0iGalQHaE8?rs=1&pid=ImgDetMain',
      category: 'Japonés',
      isActive: true,
    },
    {
      name: 'Enchiladas Verdes',
      price: 85,
      description: 'Tortillas rellenas de pollo bañadas en salsa verde y gratinadas con queso.',
      image: 'https://th.bing.com/th/id/OIP.raYGD1LuEfCFKzPBdpDKLQHaE8?rs=1&pid=ImgDetMain',
      category: 'Mexicano',
      isActive: true,
    },
    {
      name: 'Cuscús con Verduras',
      price: 90,
      description: 'Plato de origen bereber con cuscús y variedad de verduras.',
      image: 'https://th.bing.com/th/id/OIP.fFBnOxoXtCAokp8j-BqjIwAAAA?rs=1&pid=ImgDetMain',
      category: 'Bereber',
      isActive: true,
    },
    {
      name: 'Goulash Húngaro',
      price: 140,
      description: 'Estofado húngaro con carne de res, pimientos y paprika.',
      image: 'https://th.bing.com/th/id/R.359fa5c4cc21d6a965ccad13ade6feb9?rik=IqPSG9ep8NiEuw&pid=ImgRaw&r=0',
      category: 'Húngaro',
      isActive: true,
    },
    {
      name: 'Cangrejo Picante',
      price: 1250.99,
      description: 'Cangrejo salteado con salsa picante y especias asiáticas.',
      image: 'https://th.bing.com/th/id/R.ae5ab4f54b6c453e394e6f0e452cdc49?rik=iUMvgGKtBDdyGA&pid=ImgRaw&r=0',
      category: 'Asiático',
      isActive: true,
    },
  ];
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

  constructor(
    private cdr: ChangeDetectorRef
    ) {}

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
      this.myFoods.push(newFood);
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
        this.cdr.detectChanges(); // Manually trigger change detection again
    }, 2000);
  }

  public changeState(position: number) {
    console.log(position);
    this.myFoods[position].isActive =!this.myFoods[position].isActive;
  }
  public deleteProd(position: number) {
    console.log(position);
    this.myFoods.splice(position, 1);
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

}
