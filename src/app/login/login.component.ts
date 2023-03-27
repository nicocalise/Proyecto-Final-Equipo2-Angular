import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData = { email: '', password: '' };

  constructor(private http: HttpClient,private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/users/login', this.userData).subscribe(
      (response) => {
        console.log(response);
        if(response.data){
        this.router.navigate(['/about-us']);
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
