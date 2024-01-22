import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { TooltipDirective } from '../core/Directives/Tooltip.directive';
import { FoodService } from '../services/food.service';
import { Food } from '../interfaces/Food';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    TooltipDirective
  ],
  // template: `<p>Dashboard works!</p>`
  // styleUrl: './dashboard.component.css',
  templateUrl: `./dashboard.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  public userCart: any[] = [];
  constructor(
    private FoodS: FoodService
  ) {
    this.FoodS.cart$.subscribe(
      (food: any) => {
        console.log(food, 'food for observer');

        this.userCart =  food ?? [];
      }
    );
  }
}
