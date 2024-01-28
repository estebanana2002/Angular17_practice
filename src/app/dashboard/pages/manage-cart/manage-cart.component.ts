import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { TooltipDirective } from '../../../core/Directives/Tooltip.directive';

@Component({
  selector: 'app-manage-cart',
  standalone: true,
  imports: [
    CommonModule,
    TooltipDirective
  ],
  templateUrl: './manage-cart.component.html',
  styleUrl: './manage-cart.component.scss'
})
export default class ManageCartComponent {
  public userCart: any[] = [];

  public subtotal: number = 0;

  constructor(
    private router: Router,
    private FoodS: FoodService,
  ) {
    this.FoodS.cart$.subscribe(
      (cart: any) => {
        this.userCart = cart;
        this.subtotal = this.userCart.reduce((total, item) => total + item.price, 0);
      }
    );

  }

  public removeFromCart(food: any) {
    this.FoodS.removeFromCart(food);
  }

  public backToPage() {
    this.router.navigate(['/dashboard']);
  }
}
