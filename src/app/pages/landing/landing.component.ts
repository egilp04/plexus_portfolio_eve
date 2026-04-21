import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
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
export class LandingComponent {
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
