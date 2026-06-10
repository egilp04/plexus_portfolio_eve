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
import { AnioExperienciaPipe } from '../../pipes/anio-experiencia.pipe';
import { CarrouselComponent } from '../../components/carrousel/carrousel.component';
import technolgies_data from '../../../assets/data/technolgies_data.json';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule, AnioExperienciaPipe, CarrouselComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('timelineItem') items!: QueryList<ElementRef>;
  timelineKeys = ['CORDOBA', 'MUNSTER', 'TRANSLATION', 'WEBDEV', 'PLEXUS'];
  techStack = technolgies_data;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initEntranceAnimation();
    }
  }

  private initEntranceAnimation() {
    const htmlElements = this.items.map((item) => item.nativeElement);
    const tl = gsap.timeline();
    tl.to('.about-intro', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.5,
    }).to(htmlElements, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.3,
      clearProps: 'all',
    });
  }
}
