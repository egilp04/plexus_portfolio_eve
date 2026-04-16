import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule], // Importa tu módulo de traducciones
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  // Capturamos todos los elementos con #timelineItem
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;

  // Inyectamos PLATFORM_ID para comprobar si estamos en el navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Solo ejecutamos GSAP si estamos en el navegador (evita errores de SSR)
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // Animamos cada elemento de la lista
      this.timelineItems.forEach((item: ElementRef, index: number) => {
        gsap.to(item.nativeElement, {
          scrollTrigger: {
            trigger: item.nativeElement,
            start: 'top 85%', // La animación empieza cuando el top del elemento llega al 85% de la pantalla
            toggleActions: 'play none none reverse', // Se reproduce al bajar, se revierte al subir
          },
          opacity: 1, // Pasa de opacity 0 (en tu CSS) a 1
          y: 0, // Pasa de translateY(40px) (en tu CSS) a 0
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15, // Crea un ligero efecto cascada si aparecen a la vez
        });
      });
    }
  }
}
