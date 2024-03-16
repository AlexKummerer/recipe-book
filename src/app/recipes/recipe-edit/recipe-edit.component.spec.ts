import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit.component';
import { RecipeService } from '../recipe.service';
import { Subject, of } from 'rxjs';
import { RecipesRoutingModule } from '../recipes-routing.module';
import { Recipe } from '../recipe.model';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async () => {
    fixture = await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RecipesRoutingModule],
      declarations: [RecipeEditComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
        {
          provide: RecipeService,
          useValue: {
            getRecipe: () => new Subject<Recipe>(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.recipeForm).toBeDefined();
  });

  it('should add an ingredient to the form', () => {
    const initialIngredientCount = (component.recipeForm.get('ingredients') as FormArray).length;
    component.onAddIngredient();
    const updatedIngredientCount = (component.recipeForm.get('ingredients') as FormArray).length;
    expect(updatedIngredientCount).toBe(initialIngredientCount + 1);
  });

  it('should delete an ingredient from the form', () => {
    const ingredientsFormArray = component.recipeForm.get('ingredients') as FormArray;

    ingredientsFormArray.push((component as any).formBuilder.group({
      name: ['Ingredient 1'],
      amount: [1],
    }));
    const initialIngredientCount = (component.recipeForm.get('ingredients') as FormArray).length;
    component.onDeleteIngredient(0);
    const updatedIngredientCount = (component.recipeForm.get('ingredients') as FormArray).length;
    expect(updatedIngredientCount).toBe(initialIngredientCount - 1);
  });

  // Add more tests as needed for other methods and functionality of the component
});
