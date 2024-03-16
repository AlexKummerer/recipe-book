import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let recipeService: RecipeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [RecipeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    recipeService = TestBed.inject(RecipeService);
    fixture.detectChanges(); // Add this line
  });

  afterEach(() => {
    // Add this block
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRecipes method on ngOnInit', () => {
    const recipes: Recipe[] = [
      {
        id: '1',
        name: 'Test Recipe',
        description: 'Test Description',
        imagePath: 'Test Image Path',
        ingredients: [],
      },
    ];
    spyOn(recipeService, 'getRecipes').and.returnValue(recipes);

    component.ngOnInit();

    expect(component.recipes).toEqual(recipes);
    expect(recipeService.getRecipes).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {


    if (component.subscription) {
      spyOn(component.subscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    }
  });
});
