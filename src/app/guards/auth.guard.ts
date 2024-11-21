import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

/**
 * 
 * @param route current route
 * @param state  current state
 * @returns checks if the token is still valid and returns true else returns false
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.checkTokenValidity()) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }
};