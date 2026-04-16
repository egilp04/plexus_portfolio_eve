import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { UserJsonServerService } from '../../services/user-json-server.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sesionService = inject(SessionService);
  const dbUserService = inject(UserJsonServerService);
  const email = sesionService.userOnSessionEmail();

  if (!email) {
    sesionService.userSesion.set(false);
    router.navigate(['/login']);
    return false;
  }

  return dbUserService.getUsersJson().pipe(
    map((users) => {
      const encontrado = users.find((user) => user.email === email);
      if (encontrado) {
        sesionService.userSesion.set(true);
        sesionService.userOfSession.set(encontrado);
      } else {
        sesionService.userSesion.set(false);
        router.navigate(['/login']);
      }
      return sesionService.userSesion();
    }),
    catchError((err) => {
      console.error(err);
      sesionService.userSesion.set(false);
      router.navigate(['/login']);
      return of(false);
    }),
  );
};
