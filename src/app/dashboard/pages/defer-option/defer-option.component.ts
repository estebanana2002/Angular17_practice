import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FastComponent } from '../../../shared/fast/fast.component';

@Component({
  selector: 'app-defer-option',
  standalone: true,
  imports: [
    CommonModule,
    FastComponent
  ],
  templateUrl: './defer-option.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeferOptionComponent { }
