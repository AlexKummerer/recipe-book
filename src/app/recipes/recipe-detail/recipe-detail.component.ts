import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store : Store<{shoppingList: {ingredients: Ingredient[]}}>

  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const id = params.get('id');
        this.recipe = this.recipeService.getRecipeById(id);
      }

      // this.recipe = this.recipeService.getRecipeById(+params['id']);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.recipe = null;
    this.router.navigate(['/recipes']);
  }
}
