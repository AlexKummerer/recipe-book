import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Potatoes', 7),
  ];

  constructor() {}
  onUpdatedIngredient = new EventEmitter<Ingredient[]>();

  addIngredient(ingredient: Ingredient) {
    const existingIngredient = this.ingredients.find(
      (ing) => ing.name === ingredient.name
    );

    if (existingIngredient) {
      existingIngredient.amount +=  ingredient.amount;
    } else {
      const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
      this.ingredients.push(newIngredient);
    }

    this.onUpdatedIngredient.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {

    const existingIngredients = this.ingredients.map((ing) => ing.name);
   ingredients.forEach((ingredient) => {
    if (existingIngredients.includes(ingredient.name)) {
      const existingIngredient = this.ingredients.find(
        (ing) => ing.name === ingredient.name
      );
      existingIngredient.amount += ingredient.amount;
    } else {
      // Create a new ingredient object
      const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
      this.ingredients.push(newIngredient);
    }
  });

    this.onUpdatedIngredient.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
