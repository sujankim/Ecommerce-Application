import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth';

export interface UserRole {
  roleName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9090';
  private requestHeaders = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // Login with credentials
  public login(loginData: { userName: string; userPassword: string }) {
    console.log("🔑 Sending login request...");
    return this.httpClient.post<{ token: string; roles: UserRole[] }>(
      `${this.baseUrl}/authenticate`,
      loginData,
      { headers: this.requestHeaders }
    );
  }


  public forUser() {
    return this.httpClient.get(`${this.baseUrl}/api/users/forUser`, {
      responseType: 'text'
    });
  }

  public forAdmin() {
    return this.httpClient.get(`${this.baseUrl}/api/users/forAdmin`, {
      responseType: 'text'
    });
  }

  // Role validation
  public roleMatch(allowedRoles: string[]): boolean {
    const userRoles = this.userAuthService.getRoles();

    if (!userRoles || userRoles.length === 0) {
      return false;
    }

    return userRoles.some(userRole =>
      allowedRoles.includes(userRole.roleName)
    );
  }
}
