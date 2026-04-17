import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);
  if (
    sessionService.userSesion() &&
    sessionService.userOfSession()?.rol === 'admin'
  ) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
