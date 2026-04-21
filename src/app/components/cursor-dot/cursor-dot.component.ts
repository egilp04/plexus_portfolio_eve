import {
  Component,
  ElementRef,
  viewChild,
  AfterViewInit,
  inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-cursor-dot',
  standalone: true,
  templateUrl: './cursor-dot.component.html',
  styleUrl: './cursor-dot.component.scss',
})
export class CursorDotComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  dot = viewChild<ElementRef>('cursorDot');
  outline = viewChild<ElementRef>('cursorOutline');

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCursor();
    }
  }

  private initCursor() {
    const dotEl = this.dot()?.nativeElement;
    const outlineEl = this.outline()?.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', (e) => {
        // El punto sigue al ratón al instante
        gsap.to(dotEl, {
          x: e.clientX,
          y: e.clientY,
          duration: 0,
        });
        gsap.to(outlineEl, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }
}
