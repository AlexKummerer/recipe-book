import {  Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'a2bd98f1-7d8f-4a48-9de3-5037b3ebafa6',
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
        new Ingredient('Salad', 1),
        new Ingredient('Bread', 2),
        new Ingredient('Tomato', 1),
        new Ingredient('Onion', 1),
        new Ingredient('Cheese', 1),
      ]
    ),

    new Recipe(
     "8012ecd3-93bd-4987-9013-a2fc9b3508b6",
      'Second Test Recipe',
      'This is second simply a test',
      'https://cdn.pixabay.com/photo/2017/06/02/18/24/watermelon-2367029_960_720.jpg',
      [
        new Ingredient('Watermelon', 1),
        new Ingredient('Mango', 1),
        new Ingredient('Banana', 1),
        new Ingredient('Apple', 1),
        new Ingredient('Grapes', 1),
        new Ingredient('Pineapple', 1),
        new Ingredient('Orange', 1),
        new Ingredient('Papaya', 1),
      ]
    ),
  ];

  constructor(private shListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shListService.addIngredients(ingredients);
    console.log('addIngredientsToShoppingList');
    console.log(ingredients);
  }

  getRecipeById(id: string): Recipe {
    console.log(id);

    return this.recipes.find((recipe) => {
      return recipe.id === id;
    });
  }
}
