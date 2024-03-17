import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'recipe-book';
  loadedFeature = 'recipe';

  constructor(private authService : AuthService, private store : Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }

s
  onNavigate(feature: string) {
    this.loadedFeature = feature;

  }

}
