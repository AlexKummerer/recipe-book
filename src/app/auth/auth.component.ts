import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  authForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSubmit() {
    this.error = null;
    let authObs: Observable<AuthResponse | Error>;
    this.isLoading = true;
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
        authObs = from(
          this.authService.login(
            this.authForm.value.email,
            this.authForm.value.password
          )
        );
      } else {
        authObs = from(
          this.authService.signUp(
            this.authForm.value.email,
            this.authForm.value.password
          )
        );
      }
      authObs.subscribe({
        next: (user) => {
          console.log(user);
        },
        error: (error) => {
          this.error = error;
          console.log(this.error);
        },
        complete: () => {
          console.log('Complete');
        },
      });
    }

    this.isLoading = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
