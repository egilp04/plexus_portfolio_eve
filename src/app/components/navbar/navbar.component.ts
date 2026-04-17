import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // <-- Importa estas dos
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { UserJsonServerService } from '../../services/user-json-server.service';

@Component({
  selector: 'app-navbar',
  imports: [MenuModule, TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  langActual = signal('es');
  router = inject(Router);


  constructor(private translate: TranslateService) {}

  changeLang(lang: string) {
    const langSelec = lang;
    this.translate.use(langSelec);
    localStorage.setItem('idioma_seleccionado', langSelec);
  }

  ngOnInit() {
    this.langActual.set(this.translate.getFallbackLang() ?? 'es');
    this.items = [
      { label: 'NAV.ABOUT', routerLink: '/about' },
      { label: 'NAV.CONTACT', routerLink: '/contact' },
      { label: 'NAV.PROJECTS', routerLink: '/projects' },
      { label: 'NAV.LOGIN', routerLink: '/login' },
      { label: 'NAV.HOME', routerLink: '/home' },
      { label: 'NAV.DASHBOARD_ADMIN', routerLink: '/dashboard' },
    ];
  }
}
