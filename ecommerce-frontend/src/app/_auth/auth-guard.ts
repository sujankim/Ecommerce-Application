import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {UserAuthService} from '../_services/user-auth';
import {UserService} from '../_services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  const token = userAuthService.getToken();


  if (!token) {
    router.navigate(['/login']);
    return false;
  }


  const roles = route.data['roles'] as string[] | undefined;
  if (roles && roles.length > 0) {
    const hasRole = userService.roleMatch(roles);
    if (!hasRole) {
      router.navigate(['/forbidden']);
      return false;
    }
  }

  return true;
};
