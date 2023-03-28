import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  //TODO crear modelo del usuario.
  userData = { name: '', email: '', password: '', birthdate: '', location: '', rol: 'user' };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/users/register', this.userData).subscribe(
        
    (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }
}
