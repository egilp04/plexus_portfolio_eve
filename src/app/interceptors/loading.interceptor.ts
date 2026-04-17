import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingInterceptor = inject(LoaderService);
  loadingInterceptor.show();
  return next(req).pipe(finalize(() => loadingInterceptor.hide()));
};
