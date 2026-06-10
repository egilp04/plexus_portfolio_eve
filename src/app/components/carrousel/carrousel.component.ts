import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tecnolgiesStack } from '../../models/tecnolgiesStack';

@Component({
  selector: 'app-carrousel',
  imports: [MatTooltipModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss',
})
export class CarrouselComponent {
  @Input() data: tecnolgiesStack[] = [];
}
