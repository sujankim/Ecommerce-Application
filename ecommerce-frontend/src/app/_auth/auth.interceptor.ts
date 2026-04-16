import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {UserAuthService} from '../_services/user-auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);

  if (req.headers.get('No-Auth') === 'True') {
    return next(req);
  }

  const token = userAuthService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  } else {
    console.warn("⚠ No token found, request may fail:", req.url);
  }

  return next(req).pipe(
    catchError((err) => {
      console.error("❌ HTTP Error:", err);

      if (err.status === 401) {
        router.navigate(['/login']);
      } else if (err.status === 403) {
        router.navigate(['/forbidden']);
      }

      return throwError(() => err);
    })
  );
};
