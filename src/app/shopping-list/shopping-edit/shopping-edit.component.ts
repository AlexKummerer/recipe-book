import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit {
  editMode = false;
  constructor(
    private shoppingListService: ShoppingListService,
    private formBuilder: FormBuilder
  ) {}

  ingredientForm = this.formBuilder.group({
    name: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.1)]],
  });

  ngOnInit() {
    this.shoppingListService.onSelectedIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.ingredientForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
        this.editMode = true;
      }
    );
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient();
    this.onClear();
  }

  onUpdatedItem() {
    if (this.ingredientForm.valid) {
      const updatedIngredient: Ingredient = new Ingredient(
        this.ingredientForm.value.name,
        +this.ingredientForm.value.amount
      );
      this.shoppingListService.updateIngredient(updatedIngredient);
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
      this.shoppingListService.addIngredient(newIngredient);
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
  }
}
