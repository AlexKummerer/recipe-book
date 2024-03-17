import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../auth.service';
import { from, of } from 'rxjs';
import * as AuthActions from './auth.actions';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { User } from '../user.model';

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((authData) => {
        const auth = getAuth();
        const email = authData.email;
        const password = authData.password;

        return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
          tap(() => {
            // this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return this.handleAuthentication(
              +resData['_tokenResponse'].expiresIn,
              resData.user.email,
              resData.user.uid,
              resData['_tokenResponse'].idToken
            );
          }),
          catchError((errorRes) => {
            return this.handleErrors(errorRes);
          })
        );
      })
    )
  );

  handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
  ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate,
    });
  };

  authlogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((authData) => {
        const auth = getAuth();
        const email = authData.email;
        const password = authData.password;

        return from(signInWithEmailAndPassword(auth, email, password)).pipe(
          tap(() => {
            // this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return this.handleAuthentication(
              +resData['_tokenResponse'].expiresIn,
              resData.user.email,
              resData.user.uid,
              resData['_tokenResponse'].idToken
            );
          }),

          catchError((errorRes) => {
            return this.handleErrors(errorRes);
          })
        );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginStart, AuthActions.logout),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );



  // authLogout$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.logout),
  //       tap(() => {
  //         this.authService.clearLogoutTimer();
  //         localStorage.removeItem('userData');
  //         this.router.navigate(['/auth']);
  //       })
  //     ),
  //   { dispatch: false }
  // );



  handleErrors = (errorRes) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.code) {
      errorMessage = 'An unknown error occurred!';
    }
    if (errorRes.code === 'auth/user-not-found') {
      errorMessage = 'This user does not exist.';
    }
    if (errorRes.code === 'auth/wrong-password') {
      errorMessage = 'This password is not correct.';
    }
    if (errorRes.code === 'auth/too-many-requests') {
      errorMessage = 'Too many requests. Try again later.';
    }
    if (errorRes.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please try again later.';
    }
    if (errorRes.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email.';
    }
    if (errorRes.code === 'auth/user-disabled') {
      errorMessage = 'This user is disabled.';
    }
    if (errorRes.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use.';
    }
    if (errorRes.code === 'auth/weak-password') {
      errorMessage = 'This password is too weak.';
    }
    if (errorRes.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid credentials.';
    }
    if (errorRes.code === 'auth/operation-not-allowed') {
      errorMessage = 'Operation not allowed.';
    }

    return of(AuthActions.authenticateFail({ errorMessage }));
  };

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
