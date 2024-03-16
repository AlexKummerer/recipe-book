import { TestBed } from '@angular/core/testing';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from './recipe.service';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let shoppingListService: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingListService],
    });
    recipeService = TestBed.inject(RecipeService);
    shoppingListService = TestBed.inject(ShoppingListService);
  });

  it('should add ingredients to shopping list', () => {
    const ingredients: Ingredient[] = [
      new Ingredient('Ingredient 1', 1),
      new Ingredient('Ingredient 2', 2),
    ];

    spyOn(shoppingListService, 'addIngredients');

    recipeService.addIngredientsToShoppingList(ingredients);

    expect(shoppingListService.addIngredients).toHaveBeenCalledWith(ingredients);
  });

  it('should get recipe by id', () => {
    const recipeId = '123';
    const recipe = new Recipe(recipeId, 'Recipe 1', 'Description 1', 'url' , []);

    recipeService.addRecipe(recipe);

    const foundRecipe = recipeService.getRecipeById(recipeId);

    expect(foundRecipe).toEqual(recipe);
  });

  // Add more tests for other methods in the RecipeService class
});
export { RecipeService };

