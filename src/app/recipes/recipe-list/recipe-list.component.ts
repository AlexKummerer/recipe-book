import { RecipeService } from './../recipe.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  selectedRecipe: Recipe;

  constructor(private RecipeService :RecipeService  ) {}

  ngOnInit() {
    console.log('RecipeListComponent.ngOnInit')
    this.recipes = this.RecipeService.getRecipes();
  }


}
