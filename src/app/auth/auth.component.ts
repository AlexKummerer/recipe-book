import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  authForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSubmit() {

    if (this.authForm.invalid) {
      if (this.authForm.get('email').invalid) {
        alert('Please enter a valid email');
      }
      if (this.authForm.get('password').invalid) {
        alert('Please enter a valid password');
      }
    }

    if (this.authForm.valid) {
      if (this.isLoginMode) {
        await this.authService.login(
          this.authForm.value.email,
          this.authForm.value.password
        );


        console.log('Login Mode');
      } else if (!this.isLoginMode) {
        await this.authService.signUp(
          this.authForm.value.email,
          this.authForm.value.password
        );

        console.log('Signup Mode');

      }

    }


  }

  onSwitchMode() {

    this.isLoginMode = !this.isLoginMode;
  }
}
