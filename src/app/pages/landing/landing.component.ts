import {
  Component,
  AfterViewInit,
  inject,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MatIconModule } from '@angular/material/icon';
import gsap from 'gsap';

@Component({
  selector: 'app-landing',
  imports: [UpperCasePipe, TranslateModule, NavbarComponent, MatIconModule],

  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: true,
})
export class LandingComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initEntranceAnimation();
    }
  }

  private initEntranceAnimation() {
    const tl = gsap.timeline();
    tl.from('.title-container h1, .subtitle, .landing-desc', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    })
      .from(
        '.landing-section-2',
        {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4',
      )
      .from(
        '.social-links a',
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.2',
      );
  }

  activateMagnet(event: MouseEvent, element: HTMLElement) {
    const bound = element.getBoundingClientRect();
    const centerX = bound.left + bound.width / 2;
    const centerY = bound.top + bound.height / 2;
    const moveX = (event.clientX - centerX) * 0.6;
    const moveY = (event.clientY - centerY) * 0.6;
    gsap.to(element, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
  resetMagnet(element: HTMLElement) {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  }
}
