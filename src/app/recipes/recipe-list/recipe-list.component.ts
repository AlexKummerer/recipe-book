import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      uuid.v4(),
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg'
    ),

    new Recipe(
      uuid.v4(),
      'Second Test Recipe',
      'This is second simply a test',
      'https://cdn.pixabay.com/photo/2017/06/02/18/24/watermelon-2367029_960_720.jpg'
    ),
  ];
  constructor() {}

  ngOnInit() {
    console.log(this.recipes);



  }
}
