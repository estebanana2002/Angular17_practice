import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './reactive-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactiveFormComponent { }
