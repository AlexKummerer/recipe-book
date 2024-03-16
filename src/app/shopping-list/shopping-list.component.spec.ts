import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { of } from 'rxjs';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let shoppingListService: ShoppingListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent, ShoppingEditComponent],
      imports: [SharedModule, FormsModule, ReactiveFormsModule],
      providers: [ShoppingListService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    shoppingListService = TestBed.inject(ShoppingListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIngredients method on ngOnInit', () => {
    const ingredients: Ingredient[] = [
      { name: 'Ingredient 1', amount: 1 },
      { name: 'Ingredient 2', amount: 2 },
    ];
    spyOn(shoppingListService, 'getIngredients').and.returnValue(ingredients);
    component.ngOnInit();
    expect(component.ingredients).toEqual(ingredients);
  });

  it('should call selectIngredient method on onSelectedIngredient', () => {
    const index = 0;
    spyOn(shoppingListService, 'selectIngredient');
    component.onSelectedIngredient(index);
    expect(shoppingListService.selectIngredient).toHaveBeenCalledWith(index);
  });

  it('should add ingredient to ingredients array on onIngredientAdded', () => {
    const ingredient: Ingredient = { name: 'New Ingredient', amount: 1 };
    component.onIngredientAdded(ingredient);
    expect(component.ingredients).toContain(ingredient);
  });

  it('should update ingredients array on onUpdatedIngredient subscription', () => {
    const updatedIngredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
      new Ingredient('Potatoes', 7),
    ];
    spyOn(shoppingListService.onUpdatedIngredient, 'subscribe').and.returnValue(
      of(updatedIngredients).subscribe()
    );
    component.ngOnInit();
    expect(component.ingredients).toEqual(updatedIngredients);
  });
});
