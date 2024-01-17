import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-fast',
  standalone: true,
  imports: [
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section [ngClass]="['w-full h-[60px]', cssClass]">
    <ng-content #name></ng-content>

  </section>
  `
})
export class FastComponent {
  @Input({required: true}) cssClass!: string;
}
