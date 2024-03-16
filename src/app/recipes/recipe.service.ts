import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch({ type: ShoppingListActions.ADD_INGREDIENTS, ingredients: ingredients });
  }

  getRecipeById(id: string): Recipe {
    return this.recipes.find((recipe) => {
      return recipe.id === id;
    });
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);

    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: string, newRecipe: Recipe) {
    let recipeIndex = this.recipes.findIndex((recipe) => {
      return recipe.id === index;
    });

    if (recipeIndex !== -1) {
      this.recipes[recipeIndex] = newRecipe;
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: string) {
    let recipeIndex = this.recipes.findIndex((recipe) => {
      return recipe.id === index;
    });

    if (recipeIndex !== -1) {
      this.recipes.splice(recipeIndex, 1);
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = [...recipes];
    this.recipesChanged.next(this.recipes.slice());
  }
}
