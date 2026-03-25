import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const usuario = localStorage.getItem('usuario');

  if (usuario) {
    return true;
  } else {
    window.location.href = '/login';
    return false;
  }
};
