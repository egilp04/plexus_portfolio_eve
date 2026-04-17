import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProjectModel } from '../../models/projectModel';
import { TranslateModule } from '@ngx-translate/core';
import { ZooomCambioColorDirective } from '../../directivas/zooom-cambio-color.directive';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    ZooomCambioColorDirective,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CardComponent {
  @Input({ required: true }) project!: ProjectModel;
  userService = inject(SessionService);
}
