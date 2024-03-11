import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, AuthComponent],
  providers: [],
  bootstrap: [AuthModule],
})
export class AuthModule {}
