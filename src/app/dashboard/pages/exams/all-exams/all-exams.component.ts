import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-exams',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './all-exams.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AllExamsComponent { }
