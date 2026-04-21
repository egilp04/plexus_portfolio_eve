import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { CursorDotComponent } from './components/cursor-dot/cursor-dot.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingComponent, CursorDotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio_eve';
}
