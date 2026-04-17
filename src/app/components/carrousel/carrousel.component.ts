import { Component } from '@angular/core';
import tecnologias from '../../../assets/data/tecnologias.json';

@Component({
  selector: 'app-carrousel',
  imports: [],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss',
})
export class CarrouselComponent {
  techStack = tecnologias;
}
