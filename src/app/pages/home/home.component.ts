import { Component, inject } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  userSession = inject(SessionService);
}
