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
export class AboutComponent {
  timelineKeys = ['CORDOBA', 'MUNSTER', 'TRANSLATION', 'WEBDEV', 'PLEXUS'];
  techStack = technolgies_data;
}
