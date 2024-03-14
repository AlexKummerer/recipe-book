import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AlertComponent } from '../shared/alert/alert.component';
import { SharedModule } from '../shared/shared.module';


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
    SharedModule,

  ],
  exports: [AuthComponent],
  providers: [

    {provide: AlertComponent, useClass: AlertComponent},


  ],
  bootstrap: [AuthModule],
})
export class AuthModule {
  constructor(private router: Router) {}
}
