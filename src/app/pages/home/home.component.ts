import { SessionService } from '../../services/session.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  inject,
  OnDestroy,
  viewChild,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { gsap } from 'gsap';
import { ChatSupportComponent } from '../../components/chat-support/chat-support.component';
@Component({
  selector: 'app-home',
  imports: [
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    ChatSupportComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  userSession = inject(SessionService);
  private mm!: gsap.MatchMedia;

  CardsGrid = viewChild<ElementRef>('CardsGrid');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mm = gsap.matchMedia();
      this.mm.add('(max-width: 767px)', () => {
        const tlMobile = gsap.timeline();
        tlMobile.from('.hero-section', {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.1,
        });
      });

      this.mm.add('(min-width: 768px)', () => {
        const tlDesktop = gsap.timeline();
        tlDesktop.from('.hero-section', {
          opacity: 0,
          x: 1000,
          duration: 1.5,
          stagger: 0.2,
          ease: 'back.out(1.5)',
        });
      });
    }

    const container = this.CardsGrid()?.nativeElement;
    if (!container) return;
    const cards = container.querySelectorAll('.feature-card');
    const tl = gsap.timeline();
    tl.fromTo(
      cards,
      { opacity: 0, x: 1000 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        clearProps: 'all',
      },
    );
  }

  ngOnDestroy(): void {
    if (this.mm) {
      this.mm.revert();
    }
  }
}
