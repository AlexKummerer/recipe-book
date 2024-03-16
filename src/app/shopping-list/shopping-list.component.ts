import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');


  }

  onSelectedIngredient(index: number) {
    this.store.dispatch({ type: 'START_EDIT', index: index });
  }

  onIngredientAdded(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
  }
}
