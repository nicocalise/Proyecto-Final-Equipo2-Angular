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
    this.http.post<any>('https://proyecto-final-equipo2-node.vercel.app/users/login', this.userData).subscribe(
      (response) => {
        console.log(response);
        this.cookieService.set('token', response.data.token);
        this.cookieService.set('rol', response.data.user.rol);
        this.cookieService.set('id', response.data.user._id);
        if(response.data){
        this.router.navigate(['/about-us']).then(()=>{
          location.reload();
        });
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

