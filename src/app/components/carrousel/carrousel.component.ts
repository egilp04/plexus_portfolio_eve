import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tecnolgiasStack } from '../../models/tecnolgias';

@Component({
  selector: 'app-carrousel',
  imports: [MatTooltipModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss',
})
export class CarrouselComponent {
  @Input() data: tecnolgiasStack[] = [];
}
