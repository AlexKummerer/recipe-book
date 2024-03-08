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
  constructor(
    private shoppingListService: ShoppingListService,
    private formBuilder: FormBuilder
  ) {}

  ingredientForm = this.formBuilder.group({
    name: ['', Validators.required],
    amount: [0.5, [Validators.required, Validators.min(1),  ]  ],
  });

  ngOnInit() {}

  onAddItem() {
    if (this.ingredientForm.valid) {

      const newIngredient: Ingredient = new Ingredient(
        this.ingredientForm.value.name,
        +this.ingredientForm.value.amount
      );
      this.shoppingListService.addIngredient(newIngredient);
    } else if (this.ingredientForm.invalid) {
      if (this.ingredientForm.get('name').invalid) {
        alert('Please enter a valid name');
      }
      if (this.ingredientForm.get('amount').invalid) {
        alert('Please enter a valid amount');
      }
    }

  }


}
