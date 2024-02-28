import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input({required: true}) taskList!: any;


  constructor( ) {

  }
}
