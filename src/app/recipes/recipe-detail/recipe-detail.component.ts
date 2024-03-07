import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit{

  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit() {
    console.log(this.recipe);
  }


}
