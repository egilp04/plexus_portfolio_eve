import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  imports: [MenuModule, TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  langActual = signal('es');
  router = inject(Router);
  userService = inject(SessionService);

  constructor(private translate: TranslateService) {
    effect(() => {
      this.buildMenu();
    });
  }

  ngOnInit() {
    this.langActual.set(this.translate.getFallbackLang() ?? 'es');
    this.buildMenu();
  }

  changeLang(lang: string) {
    const langSelec = lang;
    this.translate.use(langSelec);
    localStorage.setItem('idioma_seleccionado', langSelec);
  }

  buildMenu() {
    const baseItems: MenuItem[] = [];
    if (
      this.userService.userSesion() &&
      this.userService.userOfSession()?.rol != 'admin'
    ) {
      baseItems.push({
        label: 'NAV.HOME',
        routerLink: '/home',
      });
    }
    baseItems.push(
      { label: 'NAV.ABOUT', routerLink: '/about' },
      { label: 'NAV.CONTACT', routerLink: '/contact' },
      { label: 'NAV.PROJECTS', routerLink: '/projects' },
    );
    if (!this.userService.userOfSession()) {
      baseItems.push({
        label: 'NAV.LOGIN',
        routerLink: '/login',
      });
    }
    if (this.userService.userOfSession()?.rol === 'admin') {
      baseItems.push({
        label: 'NAV.DASHBOARD_ADMIN',
        routerLink: '/dashboard',
      });
    }
    if (this.userService.userSesion()) {
      baseItems.push({
        label: 'NAV.CLOSESESION',
        command: () => {
          this.userService.cerrarSesion();
          this.router.navigate(['/login']);
        },
      });
    }
    this.items = baseItems;
  }
}
