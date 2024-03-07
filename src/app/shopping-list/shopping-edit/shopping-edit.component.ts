import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef;
  @ViewChild('amountInput') amountInputRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}
  ngOnInit() {}

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;

    const newIngredient = new Ingredient(ingName, ingAmount);
    console.log(newIngredient);

    this.ingredientAdded.emit(newIngredient);

  }
}
