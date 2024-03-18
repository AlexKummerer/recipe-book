import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { map, switchMap } from 'rxjs';
import * as ShoppingListACtions from '../../shopping-list/store/shopping-list.actions';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string | unknown;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes').pipe(
            map((recipesState) => {
              return recipesState.recipes.find((recipe) => {
                return recipe.id === id;
              });
            }),
            map((recipe) => {
              return recipe;
            })
          );
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      ShoppingListACtions.addIngredients({
        ingredients: this.recipe.ingredients,
      })
    );
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe({ id: this.recipe.id }));
    this.recipe = null;
    this.router.navigate(['/recipes']);
  }
}
