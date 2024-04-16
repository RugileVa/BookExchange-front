import { inject } from '@angular/core';
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from '@angular/router';
import { lastValueFrom, skipWhile, take } from 'rxjs';
import { AuthService } from './auth.service';

// intercept user login
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await lastValueFrom(toObservable(authService.user).pipe(skipWhile(user => user === undefined), take(1)));

  if (state.url != "/login" && !user) {
    router.navigate(["/login"]);
    return false;
  }
  else if (state.url == "/login" && user) {
    router.navigate(["/home"]);
    return false;
  }

  return true;

};