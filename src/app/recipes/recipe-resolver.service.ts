import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, of, switchMap, take } from 'rxjs';
import {  Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes: Recipe[] | { recipes: Recipe[] }) => {
        if (Array.isArray(recipes)) {
          if (recipes.length === 0) {
            this.store.dispatch(RecipeActions.fetchRecipes());
            return this.actions$.pipe(
              ofType(RecipeActions.setRecipes),
              take(1),
              map((action) => action.recipes)
            );
          } else {
            return of(recipes);
          }
        } else {
          return of(recipes.recipes);
        }
      })
    );
  }
}
