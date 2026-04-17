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

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule, AnioExperienciaPipe],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('timelineItem') items!: QueryList<ElementRef>;
  timelineKeys = ['CORDOBA', 'MUNSTER', 'TRANSLATION', 'WEBDEV', 'PLEXUS'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElements = this.items.map((item) => item.nativeElement);
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(htmlElements, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.3,
      });
    }
  }
}
