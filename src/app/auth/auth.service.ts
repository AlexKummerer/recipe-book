import { Injectable } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import {
  Observable,
  catchError,
  from,
  lastValueFrom,
  map,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface User {
  email: string;
  password: string;
}

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

  constructor() {}

  async signUp(email: string, password: string): Promise<AuthResponse | Error> {
    const auth = getAuth();

    return lastValueFrom(
      new Observable<AuthResponse | Error>((observer) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            const resp: AuthResponse = userCredential['_tokenResponse'];
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

  handleErrors(error) {
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

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
