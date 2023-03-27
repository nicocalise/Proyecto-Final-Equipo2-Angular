import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData = { name: '', email: '', password: '', birthdate: '', location: '' };
  // name: { type: String, required: true },
  // email: { type: String, required: true },
  // password:{ type: String, required: true },
  // birthdate: { type: String, required: true },
  // location: { type: String, required: true },
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/users/register', this.userData).subscribe(
        
    (response) => {
        debugger
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        debugger
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }
}
