import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  imports: [UpperCasePipe, TranslateModule, NavbarComponent, MatIconModule],

  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: true,
})
export class LandingComponent {}
