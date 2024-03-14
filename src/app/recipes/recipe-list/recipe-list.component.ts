import { RecipeService } from './../recipe.service';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  selectedRecipe: Recipe;

  constructor(private RecipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.RecipeService.getRecipes();

    this.subscription = this.RecipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
