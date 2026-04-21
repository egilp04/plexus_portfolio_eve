import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DarkModeService } from '../../services/dark-mode.service';
import gsap from 'gsap';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dark-mode',
  imports: [MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
})
export class DarkModeComponent {
  themeService = inject(DarkModeService);

  toggle() {
    this.themeService.toggleTheme();
  }
}
