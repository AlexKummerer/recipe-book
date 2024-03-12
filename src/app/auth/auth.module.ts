import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import {AngularFireAuthGuardModule} from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/compat';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [RouterModule, AuthComponent],
  providers: [
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideAuth(() => getAuth()),
  ],
  bootstrap: [AuthModule],
})
export class AuthModule {
  constructor(private router: Router) {}
}
