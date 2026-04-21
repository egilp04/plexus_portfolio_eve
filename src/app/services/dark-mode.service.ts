import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  theme = signal<string>(localStorage.getItem('theme') || 'light');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }
  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
