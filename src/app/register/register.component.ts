import { UserInterface } from './../home/models/users.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  public userData?: UserInterface = { name: '', email: '', password: '', birthdate: '', location: '', rol: 'user' };

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {}

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
      const url = 'https://proyecto-final-equipo2-node-oahtunfjf-nicocalise.vercel.app/register';
      const userData = this.registerForm.value;
      this.http.post(url, userData).subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
    }
  }

  function passwordMatchValidator(formgroup: FormGroup): {[key: string]: boolean} | null {
    const password = formgroup.get('password');
    const repeatPassword = formgroup.get('repeatPassword');
  return password && repeatPassword && password.value !== repeatPassword.value ?
    { 'passwordMismatch': true } : null}


