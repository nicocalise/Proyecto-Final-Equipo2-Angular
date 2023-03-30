import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl  } from '@angular/forms';
import { passwordPattern, comparePassword, checkPasswordStrength } from '../utils/validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  //TODO crear modelo del usuario.
  registerForm!: FormGroup;



  userData = { name: '', email: '', password: '', birthdate: '', location: '', rol: 'user' };

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    // this.registerForm = this.fb.group({
    //   name: ['', [Validators.required, Validators.min(1), Validators.maxLength(15)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    //   repeatPassword: ['', [Validators.required, passwordMatchValidator]],
    //   birthdate: ['', Validators.required],
    //   location: ['', Validators.required],
    //   rol: ['user', Validators.required],

}

     ngOnInit(){


        this.registerForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
        birthdate: ['', Validators.required],
        location: ['', Validators.required],
        rol: ['user', Validators.required]
        },
        {
          validator: passwordMatchValidator
        });
      }




  onSubmit() {

    debugger
      const url = 'http://localhost:3000/users/register';
      const userData = this.registerForm.value;
      this.http.post(url, userData).subscribe(response => {
        console.log(response);
        // Hacer algo con la respuesta del servidor
      }, error => {
        console.error(error);
        // Mostrar un mensaje de error al usuario
      });
    }
  }

  function passwordMatchValidator(formgroup: FormGroup): {[key: string]: boolean} | null {

    const password = formgroup.get('password');
    const repeatPassword = formgroup.get('repeatPassword');

    return password && repeatPassword && password.value !== repeatPassword.value ?
      { 'passwordMismatch': true } :
      null}


