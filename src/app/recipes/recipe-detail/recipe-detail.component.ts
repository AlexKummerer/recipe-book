import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
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
}
