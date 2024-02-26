import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pendientes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PendientesComponent { }
