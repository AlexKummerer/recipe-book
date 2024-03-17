import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
;

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
