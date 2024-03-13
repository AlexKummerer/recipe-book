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
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { _AuthInterceptorService } from './auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import {AngularFireAuthGuardModule} from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/compat';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [
    RouterModule.forChild(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [ AuthComponent, LoadingSpinnerComponent],
  providers: [
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideAuth(() => getAuth()),
    { provide : HTTP_INTERCEPTORS, useClass: _AuthInterceptorService , multi: true}
  ],
  bootstrap: [AuthModule],
})
export class AuthModule {
  constructor(private router: Router) {}
}
