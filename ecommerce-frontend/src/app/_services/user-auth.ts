import { Injectable } from '@angular/core';
import { UserRole } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public setRoles(roles: UserRole[] | null): void {
    if (roles) {
      localStorage.setItem('roles', JSON.stringify(roles));
    } else {
      localStorage.removeItem('roles');
    }
  }

  public getRoles(): UserRole[] {
    const roles = localStorage.getItem('roles');
    if (!roles || roles === 'undefined') {
      return [];
    }
    try {
      return JSON.parse(roles) as UserRole[];
    } catch {
      localStorage.removeItem('roles');
      return [];
    }
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    return this.getRoles().some(r => r.roleName === 'ADMIN');
  }

  public isUser(): boolean {
    return this.getRoles().some(r => r.roleName === 'USER');
  }
}
