import { AlertComponent } from './../shared/alert/alert.component';
import {
  ApplicationRef,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer: ViewContainerRef;

  componentRef: ComponentRef<AlertComponent>;
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public alert: AlertComponent,
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
          this.router.navigate(['/recipes']);
          console.log(user);
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error;
          this.showErrorAlert(error);
          this.isLoading = false;
        },
        complete: () => {
          console.log('Complete');
        },
      });
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private showErrorAlert(message: string) {
    this.error = message;
    console.log(this.error);

    this.modalContainer.clear();

    const componentFactory =
      this.modalContainer.createComponent(AlertComponent);
    this.componentRef = componentFactory;

    this.componentRef.instance.alertMessage = message;
    this.componentRef.instance.close.subscribe(() => {
      this.modalContainer.clear();
      this.error = null;
    });


  }

  onHandleError() {
    this.error = null;
  }
}
