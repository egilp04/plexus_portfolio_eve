import { SessionService } from '../../services/session.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { gsap } from 'gsap';
@Component({
  selector: 'app-home',
  imports: [TranslateModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements AfterViewInit {
  userSession = inject(SessionService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.hero-section', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }
}
