import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlowComponent } from '../../../shared/slow/slow.component';

@Component({
  selector: 'app-defer-views',
  standalone: true,
  imports: [
    CommonModule,
    SlowComponent
  ],
  templateUrl: './defer-views.component.html',
  styleUrl: './defer-views.component.scss'
})
export default class DeferViewsComponent {

}
