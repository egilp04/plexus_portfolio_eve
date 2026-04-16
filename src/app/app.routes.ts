import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
];
