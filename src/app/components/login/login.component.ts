import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ReusableFunctionsService } from '../../service/reusableFunctions.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormField, MatLabel, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private reusableFunctions : ReusableFunctionsService
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  private markFormAsTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }


  submitLogin() {
    if (this.loginForm.valid) {
      this.reusableFunctions.setLoginToken();
    } else {
      this.markFormAsTouched();
    }
  }

}