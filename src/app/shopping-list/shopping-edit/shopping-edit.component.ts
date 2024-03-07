import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef;
  @ViewChild('amountInput') amountInputRef;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {}

  onAddItem() {
    const ingName: string = this.nameInputRef.nativeElement.value;
    const ingAmount: number = this.amountInputRef.nativeElement.value;
    console.log(ingName, ingAmount);


    const newIngredient : Ingredient = new Ingredient(ingName, ingAmount as number);
    console.log(newIngredient);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
