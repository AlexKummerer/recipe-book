import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shListService: ShoppingListService) {}

  getRecipes() {

    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shListService.addIngredients(ingredients);

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
