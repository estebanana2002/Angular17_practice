import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent
  ],
  // template: `<p>Dashboard works!</p>`
  // styleUrl: './dashboard.component.css',
  templateUrl: `./dashboard.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent { }
