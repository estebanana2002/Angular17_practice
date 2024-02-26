import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TooltipDirective } from '../../../core/Directives/Tooltip.directive';

@Component({
  selector: 'app-card-button-second',
  standalone: true,
  imports: [
    CommonModule,
    TooltipDirective
  ],
  templateUrl: './card-button-second.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButtonSecondComponent {
  @Input({required: true}) mySignal!: any;

  public aumentar() {
    // this.mySignal.update({
    //   value: this.mySignal.value ++
    // });
    this.mySignal.set(this.mySignal() + 1);
  }
}
