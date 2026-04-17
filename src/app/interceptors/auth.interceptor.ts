import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.userToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Respuesta: `Respuesta de: ${req.url}`,
    },
  });

  return next(authReq);
};
