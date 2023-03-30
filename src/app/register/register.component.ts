import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  //TODO crear modelo del usuario.
  registerForm: FormGroup;

  userData = { name: '', email: '', password: '', birthdate: '', location: '', rol: 'user' };

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
      location: ['', Validators.required],
      rol: ['user', Validators.required],

    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const url = 'http://localhost:3000/users/register';
      const userData = this.registerForm.value;
      this.http.post(url, userData).subscribe(response => {
        console.log(response);
        // Hacer algo con la respuesta del servidor
      }, error => {
        console.error(error);
        // Mostrar un mensaje de error al usuario
      });
    } else {
      // Mostrar errores de validación
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
