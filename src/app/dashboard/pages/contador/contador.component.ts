import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardButtonComponent } from '../../components/card-button/card-button.component';
import { CardButtonSecondComponent } from '../../components/card-button-second/card-button-second.component';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [
    CommonModule,
    CardButtonComponent,
    CardButtonSecondComponent
  ],
  templateUrl: './contador.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContadorComponent {
  public contadorNormal: number = 0;
  /**
   * * El signal sirve para captar señales que en este caso
   * * se usara para obtener valores de componentes hijos sin crear intermediarios como
   * * emitters o servicios
   * * Al usar un signal para obtener valores, se usa como funcion poke es una funion interna
   */
  public counterSigma = signal(0);
}
