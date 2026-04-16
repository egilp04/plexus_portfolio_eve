import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  imports: [MenuModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private translate: TranslateService) {}
  langActual = signal('es');
  router = inject(Router);
  changeLang(lang: string) {
    const langSelec = lang;
    this.translate.use(langSelec);
    localStorage.setItem('idioma_seleccionado', langSelec);
  }

  ngOnInit() {
    this.langActual.set(this.translate.getFallbackLang() ?? 'es');

    this.items = [
      {
        label: 'NAV.ABOUT',
        command: () => this.router.navigate(['/about']),
      },
      {
        label: 'NAV.CONTACT',
        command: () => this.router.navigate(['/contact']),
      },
      {
        label: 'NAV.PROJECTS',
        command: () => this.router.navigate(['/projects']),
      },
      {
        label: 'NAV.LOGIN',
        command: () => this.router.navigate(['/login']),
      },
      {
        label: 'NAV.HOME',
        command: () => this.router.navigate(['/home']),
      },
      {
        label: 'NAV.DASHBOARD_ADMIN',
        command: () => this.router.navigate(['/dashboard']),
      },
    ];
  }
}
