import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-landing',
  imports: [UpperCasePipe, TranslateModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: true,
})
export class LandingComponent {}
