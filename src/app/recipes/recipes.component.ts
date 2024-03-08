import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;


  constructor(
    private recipeService: RecipeService,
  ) {}
  ngOnInit() {



    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }


  onSelectedRecipe($event: Recipe) {
    console.log($event);
    this.selectedRecipe = $event;
  }
}
