import { AlertComponent } from './../shared/alert/alert.component';
import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer: ViewContainerRef;

  componentRef: ComponentRef<AlertComponent>;
  isLoginMode: boolean = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public alert: AlertComponent,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      console.log(authState);

      this.isLoading = authState.loading;
      authState.authError ? this.showErrorAlert(authState.authError) : null;
    });
  }

  authForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSubmit() {
    this.error = null;
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
        this.store.dispatch(
          AuthActions.loginStart({
            email: this.authForm.value.email,
            password: this.authForm.value.password,
          })
        );
      } else {
        this.store.dispatch(
          AuthActions.signupStart({
            email: this.authForm.value.email,
            password: this.authForm.value.password,
          })
        );
      }
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private showErrorAlert(message: string) {
    this.error = message;

    this.modalContainer.clear();

    const componentFactory =
      this.modalContainer.createComponent(AlertComponent);
    this.componentRef = componentFactory;

    this.componentRef.instance.alertMessage = message;
    this.componentRef.instance.close.subscribe(() => {
      this.modalContainer.clear();
      this.store.dispatch(AuthActions.clearError());
    });
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
