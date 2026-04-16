import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('timelineItem') items!: QueryList<ElementRef>;
  timelineKeys = ['CORDOBA', 'MUNSTER', 'TRANSLATION', 'WEBDEV', 'PLEXUS'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Convertimos el QueryList de Angular a un array de elementos HTML puros
      const htmlElements = this.items.map((item) => item.nativeElement);

      // 2. Creamos un timeline de GSAP.
      // Le ponemos un pequeño delay de medio segundo para que la página termine de cargar antes de empezar.
      const tl = gsap.timeline({ delay: 0.5 });

      // 3. Animamos el array completo usando 'stagger'
      tl.to(htmlElements, {
        opacity: 1,
        x: 0, // Vuelve a su posición original (quitando el translateX del CSS)
        duration: 0.8, // Lo que tarda CADA elemento en aparecer
        ease: 'power3.out', // Una animación suave al frenar
        stagger: 0.3, // El tiempo de espera (0.3s) entre la aparición de un hito y el siguiente
      });
    }
  }
}
