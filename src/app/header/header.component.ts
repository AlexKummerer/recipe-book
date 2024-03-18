import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import {Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private store : Store<fromApp.AppState>,
  ) {}

  visible: boolean = false;

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      })
    ).subscribe((user) => {
      this.isAuthenticated = !!user;
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSub.unsubscribe();
  }

  toggle() {
    this.visible = !this.visible;
  }

  onSaveData() {
    this.store.dispatch(RecipeActions.storeRecipes());

  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());

    this.isAuthenticated = false;
  }

  onFetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }
}
