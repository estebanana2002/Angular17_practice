import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  public myRoutes = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && !route.path?.includes('**'));

  constructor(
    private sanitizer: DomSanitizer
  ) {
    // console.log(this.myRoutes);
  }

  getIcon(route: any): SafeHtml {
    if (route.data) {
      return this.sanitizer.bypassSecurityTrustHtml(route.data?.icon);
    }
    return '';
  }
}
