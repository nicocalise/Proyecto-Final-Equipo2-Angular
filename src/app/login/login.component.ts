import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData = { email: '', password: '' };
  token= this.cookieService.get('token');

  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/users/login', this.userData).subscribe(
      (response) => {
        console.log(response);
        this.cookieService.set('token', response.data.token);
        this.cookieService.set('rol', response.data.user.rol);
        this.cookieService.set('id', response.data.user._id);
        if(response.data){
        this.router.navigate(['/about-us']);
        location.reload();
        }else{
        console.log('No coinciden mail o contraseña ingresados');
        }
      },
      (error) => {
        console.log(error);

        this.router.navigate(['/register']);
      }
    );
  }



}



//import { Injectable } from '@angular/core';
//import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
//
//@Injectable()
//export class AuthInterceptor implements HttpInterceptor {
//constructor(private cookieService: CookieService) {}
//  this.cookieService.set('token', response.token);
//  intercept(req: HttpRequest<any>, next: HttpHandler) {
//  const token = this.cookieService.get('token');
//
//  if (token) {
//    const authReq = req.clone({
//    headers: req.headers.set('Authorization', `Bearer ${token}`)
//  });
//  return next.handle(authReq);
//}
//  return next.handle(req);
// }
//}
