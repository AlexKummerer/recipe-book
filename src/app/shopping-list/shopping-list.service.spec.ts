import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    service = new ShoppingListService();
  });

  it('should add a new ingredient', () => {
    const ingredient = new Ingredient('Onions', 3);
    service.addIngredient(ingredient);
    const ingredients = service.getIngredients();
    expect(ingredients.length).toBe(4);
    expect(ingredients[3].name).toBe('Onions');
    expect(ingredients[3].amount).toBe(3);
  });

  it('should update an existing ingredient', () => {
    const ingredient = new Ingredient('Tomatoes', 5);
    service.selectIngredient(1);
    service.updateIngredient(ingredient);
    const ingredients = service.getIngredients();
    expect(ingredients[1].amount).toBe(5);
  });

  it('should delete a selected ingredient', () => {
    service.selectIngredient(0);
    service.deleteIngredient();
    const ingredients = service.getIngredients();
    expect(ingredients.length).toBe(2);
    expect(ingredients[0].name).toBe('Tomatoes');
  });

  it('should add multiple ingredients', () => {
    const ingredients = [
      new Ingredient('Carrots', 4),
      new Ingredient('Cucumbers', 2),
    ];
    service.addIngredients(ingredients);
    const updatedIngredients = service.getIngredients();
    expect(updatedIngredients.length).toBe(5);
    expect(updatedIngredients[3].name).toBe('Carrots');
    expect(updatedIngredients[3].amount).toBe(4);
    expect(updatedIngredients[4].name).toBe('Cucumbers');
    expect(updatedIngredients[4].amount).toBe(2);
  });
});
