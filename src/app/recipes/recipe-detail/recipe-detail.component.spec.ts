import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { of } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let mockRecipeService: jasmine.SpyObj<RecipeService>;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockRecipeService = jasmine.createSpyObj('RecipeService', [
      'getRecipeById',
      'addIngredientsToShoppingList',
      'deleteRecipe',
    ]);
    mockActivatedRoute = {
      paramMap: of({
        has: (param: string) => true,
        get: (param: string) => '1',
      }),
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent, RecipeStartComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recipe on initialization', () => {
    const mockRecipe: Recipe = {
      id: '1',
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'Test Path',
      ingredients: [],
    };
    mockRecipeService.getRecipeById.and.returnValue(mockRecipe);

    component.ngOnInit();

    expect(mockRecipeService.getRecipeById).toHaveBeenCalledWith('1');
    expect(component.recipe).toEqual(mockRecipe);
  });

  it('should add ingredients to shopping list', () => {
    const mockIngredients: Ingredient[] = [
      new Ingredient('Ingredient 1', 5),
      new Ingredient('Ingredient 2', 8),
    ];
    component.recipe = {
      id: '1',
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'Test Path',
      ingredients: mockIngredients,
    };

    component.onAddToShoppingList();

    expect(mockRecipeService.addIngredientsToShoppingList).toHaveBeenCalledWith(
      mockIngredients
    );
  });

  it('should delete recipe and navigate to recipes page', () => {
    component.recipe = {
      id: '1',
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'null',
      ingredients: [],
    };

    component.onDeleteRecipe();

    expect(mockRecipeService.deleteRecipe).toHaveBeenCalledWith('1');
    expect(component.recipe).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes']);
  });
});
