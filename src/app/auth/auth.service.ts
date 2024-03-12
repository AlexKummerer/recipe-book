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

interface AuthResponse {
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

  async signUp(email: string, password: string) {
    // const db = getFirestore(app);

    // const app = getApp();

    const auth = getAuth();
    console.log(auth);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        // Signed up
        console.log(userCredential);
        const user = userCredential.user;

        this.currentUser = userCredential.user;
        this.authResponse = userCredential['_tokenResponse'];
                  // ...
      })
      .catch((error) => {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  onAuthStateChanged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        console.log('User is signed in');
      } else {
        console.log('User is signed out');
      }
    });
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        return user;
        // ...
      })
      .catch((error) => {
        console.log(error);
        return error;
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
