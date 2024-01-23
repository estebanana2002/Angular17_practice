import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-manage-cart',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent
  ],
  templateUrl: './manage-cart.component.html',
  styleUrl: './manage-cart.component.scss'
})
export default class ManageCartComponent {
  public userCart: any[] = [];
  constructor(
    private router: Router,
    private FoodS: FoodService
  ) {
    this.FoodS.cart$.subscribe(
      (cart: any) => {
        this.userCart = cart;
      }
    )
  }
  public backToPage() {
    this.router.navigate(['/dashboard']);
  }
}
