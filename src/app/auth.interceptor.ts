import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { skipWhile, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.user()) {
    return toObservable(authService.idToken).pipe(
      skipWhile(token => !token),
      switchMap(token => {
        const cloned = req.clone({
          headers: req.headers
            .set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
      }));
  }

  return next(req);
};