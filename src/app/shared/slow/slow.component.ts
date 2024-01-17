import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-slow',
  standalone: true,
  imports: [
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section [ngClass]="['w-full h-[60px]', cssClass]">
    Slow component
  </section>
  `
})
export class SlowComponent {
  @Input({required: true}) cssClass!: string;
  constructor() {
    const star = Date.now();
    // while (Date.now() - star < 1000) {
    //   // do nothing
    //   console.log('slow component');
    // }
  }
}
