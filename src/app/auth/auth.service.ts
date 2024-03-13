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
  user = new BehaviorSubject<User>(null);
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

  constructor(private router: Router) {}

  async signUp(email: string, password: string): Promise<AuthResponse | Error> {
    const auth = getAuth();

    return lastValueFrom(
      new Observable<AuthResponse | Error>((observer) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            const resp: AuthResponse = userCredential['_tokenResponse'];

            this.handleAuthentification(
              userCredential.user.email,
              userCredential.user.uid,
              resp.idToken,
              +resp.expiresIn
            );
            observer.next(resp);
            observer.complete();
          })
          .catch((error) => {
            console.log(error);
            observer.error(this.handleErrors(error));
          });
      })
    );
  }

  async login(email: string, password: string) {
    const auth = getAuth();

    return lastValueFrom(
      new Observable<AuthResponse | Error>((observer) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const resp: AuthResponse = userCredential['_tokenResponse'];
            this.handleAuthentification(
              userCredential.user.email,
              userCredential.user.uid,
              resp.idToken,
              +resp.expiresIn
            );
            observer.next(resp);
            observer.complete();
            // ...
          })
          .catch((error) => {
            observer.error(this.handleErrors(error));
            console.log(error);
          });
      })
    );
  }

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
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
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
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrors(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('E-Mail bereits verwendet');
        break;
      case 'auth/invalid-email':
        return new Error('Ungültige E-Mail');
        break;
      case 'auth/user-disabled':
        return new Error('Benutzer deaktiviert');
        break;
      case 'auth/invalid-credential':
        return new Error('Ungültige Anmeldeinformationen');
        break;
      case 'auth/operation-not-allowed':
        return new Error('Operation nicht erlaubt');
        break;
      case 'auth/weak-password':
        return new Error('Schwaches Passwort');
        break;
      case 'auth/user-not-found':
        return new Error('Benutzer nicht gefunden');
        break;
      case 'auth/wrong-password':
        return new Error('Falsches Passwort');
        break;
      case 'auth/too-many-requests':
        return new Error('Zu viele Anfragen');
        break;

      default:
        return new Error('Ein Fehler ist aufgetreten');
        break;
    }
  }

  public logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
