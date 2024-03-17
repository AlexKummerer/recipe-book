import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

interface LoggedInUser {
  localId?: string;
  displayName?: string;
  photoUrl?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  lastLoginAt?: string;
  createdAt?: string;
  tenantId?: string;
}

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore: Firestore = inject(Firestore);
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  currentUser: LoggedInUser = {
    email: '',
    emailVerified: false,
    localId: '',
    phoneNumber: '',
    photoUrl: '',
    tenantId: '',
    displayName: '',
    lastLoginAt: '',
    createdAt: '',
  };

  authResponse: AuthResponse = {
    kind: '',
    idToken: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    localId: '',
  };

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}




  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(
        AuthActions.authenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout();
    }, expirationDuration);
  }

  private handleAuthentification(
    email: string,
    userId: string,
    token: string | null,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(
      AuthActions.authenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
      })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
