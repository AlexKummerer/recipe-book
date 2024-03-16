import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeResolverService } from './recipe-resolver.service';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

describe('RecipeResolverService', () => {
  let resolver: RecipeResolverService;
  let dataStorageService: jasmine.SpyObj<DataStorageService>;
  let recipeService: jasmine.SpyObj<RecipeService>;

  beforeEach(() => {
    const dataStorageSpy = jasmine.createSpyObj('DataStorageService', [
      'fetchRecipes',
    ]);
    const recipeServiceSpy = jasmine.createSpyObj('RecipeService', [
      'getRecipes',
    ]);

    TestBed.configureTestingModule({
      providers: [
        RecipeResolverService,
        { provide: DataStorageService, useValue: dataStorageSpy },
        { provide: RecipeService, useValue: recipeServiceSpy },
      ],
    });

    resolver = TestBed.inject(RecipeResolverService);
    dataStorageService = TestBed.inject(
      DataStorageService
    ) as jasmine.SpyObj<DataStorageService>;
    recipeService = TestBed.inject(
      RecipeService
    ) as jasmine.SpyObj<RecipeService>;
  });

  it('should resolve recipes from the recipe service if there are recipes', () => {
    const recipes: Recipe[] = [
      {
        id: '1',
        name: 'Recipe 1',
        description: 'Description 1',
        imagePath: 'Image 1',
        ingredients: [],
      },
      {
        id: '2',
        name: 'Recipe 2',
        description: 'Description 2',
        imagePath: 'Image 2',
        ingredients: [],
      },
    ];
    recipeService.getRecipes.and.returnValue(recipes);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = resolver.resolve(route, state);

    expect(result).toEqual(recipes);
    expect(dataStorageService.fetchRecipes).not.toHaveBeenCalled();
  });

  it('should fetch recipes from the data storage service if there are no recipes', () => {
    recipeService.getRecipes.and.returnValue([]);

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result : Observable<Recipe[]> = resolver.resolve(route, state) as  Observable<Recipe[]>


    expect(result).toBeUndefined();
    expect(dataStorageService.fetchRecipes).toHaveBeenCalled();
  });
});
