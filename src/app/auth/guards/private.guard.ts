import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const privateGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('privateGuard checkAuthStatus', authService.checkAuthStatus());

  saveLatestUrl(state);
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  };

  router.navigateByUrl('/auth/login');
  return false;
};

const saveLatestUrl = (state: RouterStateSnapshot) => {
  window.localStorage.setItem('url', state.url);
}
