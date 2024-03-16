import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import {  Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer'
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit {
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  ingredientForm = this.formBuilder.group({
    name: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.1)]],
  });

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((state) => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItemIndex = state.editedIngredientIndex;
        this.ingredientForm.setValue({
          name: state.editedIngredient.name,
          amount: state.editedIngredient.amount,
        });
      } else {
        this.ingredientForm.reset();
        this.editMode = false;
      }
    });
  }

  onDeleteItem() {
    this.store.dispatch({
      type: ShoppingListActions.DELETE_INGREDIENT,
      index: this.editedItemIndex,
    });
    this.onClear();
  }

  onUpdatedItem() {
    if (this.ingredientForm.valid) {
      const updatedIngredient: Ingredient = new Ingredient(
        this.ingredientForm.value.name,
        +this.ingredientForm.value.amount
      );
      this.store.dispatch({
        type: ShoppingListActions.UPDATE_INGREDIENT,
        ingredient: updatedIngredient,
        index: this.editedItemIndex,
      });
    } else if (this.ingredientForm.invalid) {
      if (this.ingredientForm.get('name').invalid) {
        alert('Please enter a valid name');
      }
      if (this.ingredientForm.get('amount').invalid) {
        alert('Please enter a valid amount');
      }
    }
  }

  onAddItem() {
    if (this.ingredientForm.valid) {
      const newIngredient: Ingredient = new Ingredient(
        this.ingredientForm.value.name,
        +this.ingredientForm.value.amount
      );
      this.store.dispatch({
        type: ShoppingListActions.ADD_INGREDIENT,
        ingredient: newIngredient,
      });

      this.onClear();
    } else if (this.ingredientForm.invalid) {
      if (this.ingredientForm.get('name').invalid) {
        alert('Please enter a valid name');
      }
      if (this.ingredientForm.get('amount').invalid) {
        alert('Please enter a valid amount');
      }
    }
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.store.dispatch({ type: ShoppingListActions.STOP_EDIT });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch({ type: ShoppingListActions.STOP_EDIT });
  }
}
