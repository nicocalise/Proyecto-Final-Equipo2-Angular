import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth-token') !== null;
  }
}
// src/app/auth/auth.service.ts
//import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';
//@Injectable()
//export class AuthService {
//  constructor(public jwtHelper: JwtHelperService) {}
//  // ...
//  public isAuthenticated(): boolean {
//    const token = localStorage.getItem('token');
//    // Check whether the token is expired and return
//    // true or false
//    return !this.jwtHelper.isTokenExpired(token);
//  }
//}