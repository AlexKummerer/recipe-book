import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  selectedRecipe: Recipe;

  constructor( private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription =   this.store.select('recipes').pipe(map(recipesState => recipesState.recipes)).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
